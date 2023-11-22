import Carousel from 'react-bootstrap/Carousel';
import React, { useRef } from 'react'
import emailjs from "@emailjs/browser";
import './style.css'
import { toast, ToastContainer } from 'react-toastify';
function Home() {
    const form = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs
            .sendForm(
                "service_tcb1nxh",
                "template_spyuuz3",
                form.current,
                "hgPm5R2WzQbjbx6R8"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    toast.success("Message Sent", {
                        theme: "colored"
                    })
                },
                (error) => {
                    toast.error(error.txt, {
                        theme: "colored"
                    })
                }
            );
    }
    return (
        <>
            <div>
                <ToastContainer
                    autoClose={2500}
                />
                <section id="hero" className="d-flex align-items-center">
                    <div className="container" data-aos="zoom-out" data-aos-delay={100}>
                        <h1>Welcome to <span>Society Management</span></h1>
                        <h2>A housing society can maintain the monthly funds for maintenance
                            easily at their fingertips.</h2>
                    </div>
                </section>
                <section id="featured-services" className="featured-services">
                    <div className="container" data-aos="fade-up">
                        <div className="row">
                            <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                                <div className="icon-box" data-aos="fade-up" data-aos-delay={100}>
                                    <div className="icon"><i className="bx bxl-dribbble" /></div>
                                    <h4 className="title"><a>Home Rent</a></h4>
                                    <p className="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                                <div className="icon-box" data-aos="fade-up" data-aos-delay={200}>
                                    <div className="icon"><i className="bx bx-file" /></div>
                                    <h4 className="title"><a>Electricity Bills</a></h4>
                                    <p className="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                                <div className="icon-box" data-aos="fade-up" data-aos-delay={300}>
                                    <div className="icon"><i className="bx bx-tachometer" /></div>
                                    <h4 className="title"><a>Water Bills</a></h4>
                                    <p className="description">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
                                <div className="icon-box" data-aos="fade-up" data-aos-delay={400}>
                                    <div className="icon"><i className="bx bx-world" /></div>
                                    <h4 className="title"><a>House Keeping</a></h4>
                                    <p className="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section id="about" className="about section-bg">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <h2>About</h2>
                        <h3>Find Out More <span>About Us</span></h3>
                        <p>Always be a smart worker</p>
                    </div>
                    <div className="row">
                        <div className="col-lg-6" data-aos="fade-right" data-aos-delay={100}>
                            <img src="https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="img-fluid" />
                        </div>
                        <div className="col-lg-6 pt-4 pt-lg-0 content d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay={100}>
                            <h3>For managing the financial operations typically done in a society.</h3>
                            <p className="fst-italic">
                                We are the managing head of this Society Financial Maintenance Site.
                                Our Motive is to make the world in smart way.
                            </p>
                            <ul>
                                <li>
                                    <i className="bx bx-store-alt" />
                                    <div>
                                        <h5>Billing</h5>
                                        <p>We are providing a user friendly platform to view
                                            your bill details and safely pay your bills.</p>
                                    </div>
                                </li>
                                <li>
                                    <i className="bx bx-images" />
                                    <div>
                                        <h5>Payment Gateway</h5>
                                        <p>Razorpay is the best payment gateway, which accepts credit and debit cards,
                                            UPI, net banking with more than 50 banks, and a variety of mobile wallets.</p>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </section>
            <div className="section-title">
                <h2>Contact</h2>
                <h3><span>Contact Us</span></h3>
                <p>
                    In order that we may be able, at times, to find fault,
                    it will happen in every way, but it is expedient to obtain the pleasure and the pleasure of life.
                </p>

                <div className='container col-md-5'>
                    <form ref={form} onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Name</label>
                            <input type="text" className="form-control" id="inputEmail4" name="user_name" required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputPassword4" name="user_email" required />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress" className="form-label">Society Name</label>
                            <input type="text" className="form-control" id="inputAddress" name="society" required />
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputAddress2" className="form-label">Message</label>
                            <textarea type="text" className="form-control" id="inputAddress2" name="message" required />
                        </div>
                        <center> <div className="col-12">
                            <button type="submit"  className="btn btn-outline-primary">Submit</button>
                        </div></center>

                    </form>
                </div>
            </div>

        </>
    )
}

export default Home