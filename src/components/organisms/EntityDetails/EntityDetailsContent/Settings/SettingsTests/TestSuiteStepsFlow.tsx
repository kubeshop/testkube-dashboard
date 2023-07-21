import {useEffect, useMemo, useState} from 'react';
import ReactFlow, {Controls, Edge, Node} from 'reactflow';

import {nanoid} from '@reduxjs/toolkit';

import {LocalStep} from '@src/models/testSuite';

import AddNode from './Nodes/AddNode';
import IntersectionNode from './Nodes/IntersectionNode';
import StepNode from './Nodes/StepNode';
import {ReactFlowContainer, intersectionHeight, intersectionWidth, itemHeight, itemWidth} from './SettingsTests.styled';

interface ExtendedNode extends Node {
  group?: number | string;
}

type TestSuiteStepsFlowProps = {
  steps: LocalStep[][];
  setSteps: (steps: LocalStep[][]) => void;
  showTestModal: (group: number | string) => void;
  showDelayModal: (group: number | string) => void;
  isV2: boolean;
};

// Configure
const horizontalGap = 150;
const verticalGapBeforeAdd = 20;
const verticalGapBetweenItems = 32;
const itemVerticalSpace = verticalGapBetweenItems + 68;
const itemHorizontalSpace = itemWidth + horizontalGap;

const getIntersectionPosition = (group: number) => ({
  x: group * itemHorizontalSpace - (horizontalGap / 2 + intersectionWidth / 2),
  y: (itemHeight - intersectionHeight) / 2,
});
const getAddPosition = (group: number, groupLength: number) => ({
  x: group * itemHorizontalSpace + (itemWidth / 2 - intersectionWidth / 2),
  y: groupLength * itemVerticalSpace - verticalGapBeforeAdd,
});
const getItemPosition = (group: number, itemIndex: number) => ({
  x: group * itemHorizontalSpace,
  y: itemIndex * itemVerticalSpace,
});

const TestSuiteStepsFlow: React.FC<TestSuiteStepsFlowProps> = props => {
  const {steps, setSteps, showDelayModal, showTestModal, isV2} = props;

  const [nodes, setNodes] = useState<ExtendedNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const removeNode = (id: string, group: number) => {
    if (steps[group].length === 1) {
      if (steps[group][0].id === id) {
        setSteps([...steps.slice(0, group), ...steps.slice(group + 1)]);
      }
    } else {
      setSteps([...steps.slice(0, group), steps[group].filter(item => item.id !== id), ...steps.slice(group + 1)]);
    }
  };

  useEffect(() => {
    const newNodes: ExtendedNode[] = [];

    steps.forEach((step, index) => {
      newNodes.push(
        ...step.map((item, itemIndex) => ({
          type: 'step',
          id: item.id!,
          data: {...item, removeNode, group: index},
          position: getItemPosition(index, itemIndex),
          group: index,
        }))
      );

      if (!isV2) {
        newNodes.push({
          type: 'add',
          id: nanoid(),
          position: getAddPosition(index, step.length),
          data: {showDelayModal, showTestModal, group: index},
        });
      }

      const intersectionGroup = `${index}-intersection`;
      newNodes.push({
        type: 'intersection',
        id: nanoid(),
        position: getIntersectionPosition(index + 1),
        data: {showDelayModal, showTestModal, group: intersectionGroup, last: index === steps.length - 1},
        group: intersectionGroup,
      });
    });

    setNodes(newNodes);
  }, [steps]);

  // add edges
  useEffect(() => {
    const newEdges: Edge[] = [];

    nodes.forEach(node => {
      const currentId = node.id;

      const isIntersection = node.group && /-intersection$/.test(String(node.group));

      if (isIntersection) {
        const filteredNodes = nodes.filter(x => x.group === Number(String(node.group).split('-')[0]) + 1);
        filteredNodes.forEach(nextNode => {
          newEdges.push({id: `${currentId}-${nextNode.id}`, source: currentId, target: nextNode.id});
        });
      } else {
        const nextIntersection = nodes.find(x => x.group === `${node.group}-intersection`);
        if (nextIntersection) {
          newEdges.push({id: `${currentId}-${nextIntersection.id}`, source: currentId, target: nextIntersection.id});
        }
      }
    });

    setEdges(newEdges);
  }, [nodes]);

  const nodeTypes = useMemo(() => ({step: StepNode, intersection: IntersectionNode, add: AddNode}), []);

  return (
    <ReactFlowContainer>
      <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges}>
        <Controls position="bottom-right" showInteractive={false} />
      </ReactFlow>
    </ReactFlowContainer>
  );
};

export default TestSuiteStepsFlow;
