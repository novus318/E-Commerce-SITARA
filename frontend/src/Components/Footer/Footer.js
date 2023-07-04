
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
     <MDBFooter className='text-center footer' color='white'>
      <MDBContainer className='p-4'>
        <section className='mb-4'>
          <MDBBtn outline color="light" floating className='m-1' role='button'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>
          <MDBBtn outline color="light" floating className='m-1' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='m-1' role='button'>
            <MDBIcon fab icon='whatsapp' />
          </MDBBtn>
        </section>

        <section className='mb-4'>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
            voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
            sequi voluptate quas.
          </p>
        </section>

        <section className=''>
          <MDBRow>
            <MDBCol className='mb-4 mb-md-0'>
              <div className='text-uppercase fh'>Sitara</div>

              <ul className='list-unstyled mb-0'>
                <li>
                <Link to='/about' className='cursor'>
                    About
                </Link>
                <li>
                </li>
                <Link to='/contact' className='cursor'>
                Contact Us
                </Link>
                <li>
                </li>
                <Link to='/privacy' className='cursor'>
                Privacy Policy
                </Link>
                <li>
                </li>
                <Link to='/terms' className='cursor'>
                Terms of Use
                </Link>
                </li>
              </ul>
            </MDBCol>

            <MDBCol className='mb-4 mb-md-0'>
              <h5 className='text-uppercase fh'>Categories</h5>

              <ul className='list-unstyled mb-0 '>
                <li>
                <Link to='/item1' className='cursor'>
                    item 1
                </Link>
                </li>
                <li>
                <Link to='/item2' className='cursor'>
                    item 2
                </Link>
                </li>
                <li>
                <Link to='/item3' className='cursor'>
                    item 3
                </Link>
                </li>
                <li>
                <Link to='/item4' className='cursor'>
                    item 4
                </Link>
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; 2023 Designed & Developed by <a href='https://novus318.github.io/' target="_blank" rel='noreferrer' className='footer-span p-1'>Muhammed Nizamudheen M</a>
      </div>
    </MDBFooter>
    </div>
  )
}

export default Footer;