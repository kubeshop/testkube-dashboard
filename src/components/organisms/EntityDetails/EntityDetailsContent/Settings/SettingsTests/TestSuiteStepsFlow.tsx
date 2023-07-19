import {useEffect, useMemo, useState} from 'react';
import ReactFlow, {Controls, Edge, Node} from 'reactflow';
import 'reactflow/dist/style.css';

import {nanoid} from '@reduxjs/toolkit';

import {LocalStep} from '@src/models/testSuite';

import IntersectionNode from './Nodes/IntersectionNode';
import StepNode from './Nodes/StepNode';
import {ReactFlowContainer} from './SettingsTests.styled';

interface ExtendedNode extends Node {
  group?: number | string;
}

type TestSuiteStepsFlowProps = {
  steps: LocalStep[][];
  setSteps: (steps: LocalStep[][]) => void;
  showModal: (value: string, group: number | string) => void;
};

const TestSuiteStepsFlow: React.FC<TestSuiteStepsFlowProps> = props => {
  const {steps, setSteps, showModal} = props;

  const [nodes, setNodes] = useState<ExtendedNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const removeNode = (id: string, group: number) => {
    if (steps[group].length === 1) {
      setSteps([...steps.slice(0, group), ...steps.slice(group + 1)]);
    } else {
      setSteps([...steps.slice(0, group), steps[group].filter(item => item.id !== id), ...steps.slice(group + 1)]);
    }
  };

  useEffect(() => {
    const newNodes: ExtendedNode[] = [];

    steps.forEach((step, index) => {
      step.forEach((item: LocalStep, itemIndex: number) =>
        newNodes.push({
          type: 'test',
          id: item.id!,
          data: {...item, removeNode, group: index},
          position: {x: index * 450, y: itemIndex * 100},
          group: index,
        })
      );

      newNodes.push({
        type: 'intersection',
        id: nanoid(),
        position: {x: index * 450 + 135, y: step.length * 100 - 20},
        data: {showModal, group: index, withoutHandles: true},
      });

      const intersectionGroup = `${index}-intersection`;
      newNodes.push({
        type: 'intersection',
        id: nanoid(),
        position: {x: (index + 1) * 450 - 90, y: 11},
        data: {showModal, group: intersectionGroup},
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

      const nextIntersection =
        typeof node.group === 'number' && nodes.find(x => x.group === `${node.group}-intersection`);

      if (nextIntersection) {
        newEdges.push({id: `${currentId}-${nextIntersection.id}`, source: currentId, target: nextIntersection.id});
      } else {
        const filteredNodes = nodes.filter(x => x.group === Number(String(node.group).split('-')[0]) + 1);

        filteredNodes.forEach(nextNode => {
          newEdges.push({id: `${currentId}-${nextNode.id}`, source: currentId, target: nextNode.id});
        });
      }
    });

    setEdges(newEdges);
  }, [nodes]);

  const nodeTypes = useMemo(() => ({test: StepNode, intersection: IntersectionNode}), []);

  return (
    <ReactFlowContainer>
      <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges}>
        <Controls position="bottom-right" showInteractive={false} />
      </ReactFlow>
    </ReactFlowContainer>
  );
};

export default TestSuiteStepsFlow;
