export default [
  {
    name: 'likes',
    value: 'gt0',
    selected: false,
    items: [
      {
        text: 'Is greater than',
        value: 'gt',
      },
      {
        text: 'Is equal to',
        value: 'et',
      },
      {
        text: 'Is less than',
        value: 'lt',
      },
    ],
  },
  {
    name: 'status',
    value: 'published',
    selected: false,
    items: [
      {
        text: 'Published',
        value: 'published',
      },
      {
        text: 'Pending Review',
        value: 'pending_review',
      },
      {
        text: 'Spam',
        value: 'spam',
      },
    ],
  },
  {
    name: 'submitted_by',
    value: '',
    selected: false,
  },
];
