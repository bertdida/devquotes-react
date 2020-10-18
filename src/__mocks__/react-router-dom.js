// https://stackoverflow.com/a/64041563/8062659
module.exports = {
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({ pathname: '/' }),
  useHistory: jest.fn().mockReturnValue({ location: { search: '' } }),
};
