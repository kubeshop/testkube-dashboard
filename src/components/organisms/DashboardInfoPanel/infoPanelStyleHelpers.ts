export const getInfoPanelFlexProperty = (conditions: any) => {
  const {isInfoPanelExpanded, shouldInfoPanelBeShown, isSecondLevelOpen, isRecordSelected} = conditions;

  if (shouldInfoPanelBeShown) {
    if (isInfoPanelExpanded) {
      if (isRecordSelected) {
        if (isSecondLevelOpen) {
          return '3';
        }

        return '1';
      }

      return '0 0 400px';
    }

    return '0 0 80px';
  }

  return '0';
};
