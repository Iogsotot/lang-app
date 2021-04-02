import { BrowserRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import Menu from './Menu';

describe('Test suits for Menu', () => {
  it('should match with snapshot', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
      <Menu/>
      </BrowserRouter>
    )
    .toJSON();
   expect(tree).toMatchSnapshot();
   });
  });