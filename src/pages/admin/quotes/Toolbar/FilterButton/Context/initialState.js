export default [
  {
    id: 1,
    name: 'likes',
    value: 'gt0',
    isSelected: false,
    errors: [],
    items: [
      {
        id: 1,
        text: 'Is greater than',
        value: 'gt',
      },
      {
        id: 2,
        text: 'Is equal to',
        value: 'et',
      },
      {
        id: 3,
        text: 'Is less than',
        value: 'lt',
      },
    ],
  },
  {
    id: 2,
    name: 'status',
    value: 'published',
    isSelected: false,
    errors: [],
    items: [
      {
        id: 1,
        text: 'Published',
        value: 'published',
      },
      {
        id: 2,
        text: 'Pending Review',
        value: 'pending_review',
      },
      {
        id: 3,
        text: 'Spam',
        value: 'spam',
      },
    ],
  },
  {
    id: 3,
    name: 'submitted_by',
    value: '',
    isSelected: false,
    errors: [],
  },
];
