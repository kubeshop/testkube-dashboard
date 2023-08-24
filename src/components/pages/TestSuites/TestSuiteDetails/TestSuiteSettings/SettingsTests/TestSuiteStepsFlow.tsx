import {FC, useEffect, useMemo, useState} from 'react';
import ReactFlow, {Controls, Edge, Node} from 'reactflow';

import {nanoid} from '@reduxjs/toolkit';

import type {LocalStep} from '@models/testSuite';

import {
  ReactFlowContainer,
  addHeight,
  itemHeight,
  itemWidth,
} from '@pages/TestSuites/TestSuiteDetails/TestSuiteSettings/SettingsTests.styled';

import {AddNode} from './Nodes/AddNode';
import {IntersectionNode} from './Nodes/IntersectionNode';
import {StepNode} from './Nodes/StepNode';

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

const getItemPosition = (group: number, itemIndex: number, offsetY: number) => ({
  x: horizontalGap + itemWidth / 2 + group * (itemWidth + horizontalGap),
  y: itemHeight / 2 + itemIndex * (verticalGapBetweenItems + itemHeight) + offsetY,
});
const getIntersectionPosition = (group: number, offsetY: number) => {
  const {x, y} = getItemPosition(group, 0, offsetY);
  return {x: x - itemWidth / 2 - horizontalGap / 2, y};
};
const getAddPosition = (group: number, groupLength: number, offsetY: number) => {
  const {x, y} = getItemPosition(group, groupLength - 1, offsetY);
  return {x, y: y + itemHeight / 2 + verticalGapBeforeAdd + addHeight / 2};
};
const getHeight = (maxLength: number) => getItemPosition(0, maxLength - 1, 0).y + itemHeight / 2;

export const TestSuiteStepsFlow: FC<TestSuiteStepsFlowProps> = props => {
  const {steps, setSteps, showDelayModal, showTestModal, isV2} = props;

  const [nodes, setNodes] = useState<ExtendedNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const deleteNode = (id: string, group: number) => {
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
    const maxItemsLength = Math.max(...steps.map(x => x.length));
    const chartHeight = getHeight(maxItemsLength);

    steps.forEach((step, group) => {
      const groupHeight = getHeight(step.length);
      const groupOffsetY = (chartHeight - groupHeight) / 2;

      newNodes.push(
        ...step.map((item, itemIndex) => ({
          type: 'step',
          id: item.id!,
          data: {deleteNode, item, last: group === steps.length - 1, group},
          position: getItemPosition(group, itemIndex, groupOffsetY),
        }))
      );

      if (!isV2) {
        newNodes.push({
          type: 'add',
          id: nanoid(),
          position: getAddPosition(group, step.length, groupOffsetY),
          data: {showDelayModal, showTestModal, group},
        });
      }
    });

    for (let group = 0; group <= steps.length; group += 1) {
      newNodes.push({
        type: 'intersection',
        id: nanoid(),
        position: getIntersectionPosition(group, (chartHeight - itemHeight) / 2),
        data: {
          showDelayModal,
          showTestModal,
          last: group === steps.length,
          group,
        },
      });
    }

    setNodes(newNodes);
  }, [steps]);

  // add edges
  useEffect(() => {
    const newEdges: Edge[] = nodes.reduce((result, node) => {
      if (node.type === 'intersection') {
        const nextNodes = nodes.filter(x => x.type === 'step' && x.data.group === node.data.group);
        return [
          ...result,
          ...nextNodes.map(nextNode => ({
            id: `${node.id}-${nextNode.id}`,
            source: node.id,
            target: nextNode.id,
          })),
        ];
      }
      if (node.type === 'step') {
        const nextIntersection = nodes.find(x => x.type === 'intersection' && x.data.group === node.data.group + 1)!;
        return [...result, {id: `${node.id}-${nextIntersection.id}`, source: node.id, target: nextIntersection.id}];
      }
      return result;
    }, [] as Edge[]);

    setEdges(newEdges);
  }, [nodes]);

  const flowOptions: Partial<Parameters<typeof ReactFlow>[0]> = useMemo(
    () => ({
      nodeTypes: {step: StepNode, intersection: IntersectionNode, add: AddNode},
      nodeOrigin: [0.5, 0.5],
      defaultEdgeOptions: {interactionWidth: 0},
    }),
    []
  );

  return (
    <ReactFlowContainer>
      <ReactFlow nodes={nodes} edges={edges} {...flowOptions}>
        <Controls position="bottom-right" showInteractive={false} />
      </ReactFlow>
    </ReactFlowContainer>
  );
};
