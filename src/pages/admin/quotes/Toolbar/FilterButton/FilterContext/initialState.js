export default {
  isLoading: true,
  options: [
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
      items: [], // these items will be fetched from the API
    },
    {
      id: 3,
      name: 'submitted_by',
      value: '',
      isSelected: false,
      errors: [],
    },
  ],
};
