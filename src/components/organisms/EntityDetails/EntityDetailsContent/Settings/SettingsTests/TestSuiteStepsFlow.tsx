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
  showTestModal: (group: number) => void;
  showDelayModal: (group: number) => void;
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

      newNodes.push({
        type: 'intersection',
        id: nanoid(),
        position: getIntersectionPosition(index + 1),
        data: {showDelayModal, showTestModal, group: index, last: index === steps.length - 1},
      });
    });

    setNodes(newNodes);
  }, [steps]);

  // add edges
  useEffect(() => {
    const newEdges: Edge[] = [];

    nodes.forEach(node => {
      if (node.type === 'intersection') {
        const filteredNodes = nodes.filter(x => x.type === 'step' && x.data.group === node.data.group + 1);
        filteredNodes.forEach(nextNode => {
          newEdges.push({id: `${node.id}-${nextNode.id}`, source: node.id, target: nextNode.id});
        });
      } else if (node.type === 'step') {
        const nextIntersection = nodes.find(x => x.type === 'intersection' && x.data.group === node.data.group);
        if (nextIntersection) {
          newEdges.push({id: `${node.id}-${nextIntersection.id}`, source: node.id, target: nextIntersection.id});
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
