
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBCol,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit';
import './Footer.css';

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
              <h5 className='text-uppercase'>Sitara</h5>

              <ul className='list-unstyled mb-0'>
                <li className='cursor'>
                    About
                </li>
                <li className='cursor'>
                    Contact Us
                </li>
                <li className='cursor'>
                  Privacy Policy
                </li>
                <li className='cursor'>
                  Terms of Use
                </li>
              </ul>
            </MDBCol>

            <MDBCol className='mb-4 mb-md-0'>
              <h5 className='text-uppercase'>Categories</h5>

              <ul className='list-unstyled mb-0 cursor'>
                <li>
                    item 1
                </li>
                <li>
                    item 2
                </li>
                <li>
                    item 3
                </li>
                <li>
                    item 4
                </li>
                <li>
                    item 5
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Designed & Developed by <a href='https://novus318.github.io/' target="_blank" rel='noreferrer' className='footer-span p-1'>Muhammed Nizamudheen M</a>
      </div>
    </MDBFooter>
    </div>
  )
}

export default Footer;