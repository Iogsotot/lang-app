import { BrowserRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import Header from './Header';

describe('Test suits for Header', () => {
  it('should match with snapshot', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
      <Header/>
      </BrowserRouter>
    )
    .toJSON();
   expect(tree).toMatchSnapshot();
   });
  });