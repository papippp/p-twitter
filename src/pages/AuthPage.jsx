import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../components/AuthProvider'
export default function AuthPage() {
    const loginImage = 'https://sig1.co/img-twitter-1'

    const [modalShow, setModalShow] = useState(null)

    const handleShowSignUp = () => setModalShow('SignUp')
    const handleShowLogin = () => setModalShow('Login')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const navigate = useNavigate()
    const auth = getAuth()
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        if (currentUser) {
            navigate('/profile')
        }
    }, [currentUser, navigate])

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const res = await createUserWithEmailAndPassword(
                auth, username, password

            )
            console.log(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const provider = new GoogleAuthProvider()
    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider)
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(
                auth, username, password
            )


        } catch (error) {
            console.error(error)
        }
    }
    const handleClose = () => setModalShow(null)
    return (
        <Row>
            <Col sm={6}>
                <Image src={loginImage} fluid />
            </Col>
            <Col sm={6} className='p-4'>
                <i className='bi bi-twitter' style={{ fontSize: 50, color: 'dodgerblue' }}>

                </i>
                <p className='mt-5' style={{ fontSize: 64 }}>Happening now</p>
                <h2 className='mt-5' style={{ fontSize: 64 }}>Join Twitter Today</h2>
                <Col sm={5} className='d-grid gap-2'>
                    <Button variant='outline-dark' className='rounded-pill' onClick={handleGoogleLogin}>
                        <i className='bi bi-google'></i> Sign up with google
                    </Button>

                    <Button variant='outline-dark' className='rounded-pill'>
                        <i className='bi bi-apple'></i> Sign up with Apple
                    </Button>

                    <Button variant='outline-dark' className='rounded-pill'>
                        <i className='bi bi-facebook'></i> Sign up with Facebook
                    </Button>

                    <p style={{ textAlign: 'center' }}>Or</p>

                    <Button className='rounded-pill' onClick={handleShowSignUp}>Create an account</Button>

                    <p style={{ fontSize: '12px' }}>By signin up You agree to the terms of PPP</p>
                    <p className='mt-5' style={{ fontWeight: 'bold' }}>Already Have an account?</p>

                    <Button className='rounded-pill' variant='outline-primary' onClick={handleShowLogin}>Sign In</Button>
                </Col>
                <Modal show={modalShow !== null} onHide={handleClose} animation={false} centered>
                    <Modal.Body >
                        <h2 className='mb-4' style={{ fontWeight: 'bold' }}>
                            {modalShow === 'SignUp' ? 'Create your account' : 'Login your account'}
                        </h2>
                        <Form className='d-grid gap-2 px-5'
                            onSubmit={modalShow === 'SignUp' ? handleSignUp : handleLogin}>
                            <Form.Group className='mb-3'>
                                <Form.Control onChange={(e) => setUsername(e.target.value)}
                                    type='text' placeholder='enter username' />
                            </Form.Group>

                            <Form.Group className='mb-3'>
                                <Form.Control onChange={(e) => setPassword(e.target.value)}
                                    type='password' placeholder='enter password' />
                            </Form.Group>

                            <p style={{ fontSize: '12px' }}>Agrre to work till i get it right</p>
                            <Button className='rounded-pill' type='submit'>
                                {modalShow === 'SignUp' ? 'SignUp' : 'Login'}
                            </Button>
                        </Form>
                    </Modal.Body>

                </Modal>


            </Col>

        </Row>
    )
}
