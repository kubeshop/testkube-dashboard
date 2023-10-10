const defaultCronString = '* * * * *';

const notScheduled = {
  label: 'Not scheduled',
  value: '',
};

export const custom = {
  label: 'Custom',
  value: defaultCronString,
};

export const quickOptions = [
  {
    label: 'Every 5 minutes',
    value: '*/5 * * * *',
  },
  {
    label: 'Every 30 minutes',
    value: '*/30 * * * *',
  },
  {
    label: 'Every hour',
    value: '0 * * * *',
  },
  {
    label: 'Every day',
    value: '0 0 * * *',
  },
  {
    label: 'Every week',
    value: '0 0 * * 0',
  },
  {
    label: 'Every month',
    value: '0 0 1 * *',
  },
  custom,
  notScheduled,
];
