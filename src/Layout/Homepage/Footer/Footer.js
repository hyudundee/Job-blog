import React from 'react'
import classes from './Footer.module.css'
import { Row, Col } from 'reactstrap';

const Footer = () => {
  return (
    <div className={classes.Container}>
      <Row>
         <p>  </p> 
      </Row>
      <Row>
      <Col>
        <h6>Team Members</h6>
        <ul>
          <li className={classes.li}>Zhengquan Chen, Lei Cao</li>
          <li className={classes.li}>Yuting Sun, Kelly He</li>
          <li className={classes.li}>Haoran Yu</li>
        </ul>
        </Col>
        <Col>
        <h6>Project Tech Stack</h6>
        <ul>
          <li className={classes.li}>React, ReactStrap</li>
          <li className={classes.li}>Redux, BootStrap</li>
          <li className={classes.li}>Firebase</li>
        </ul>
        </Col>
        <Col>
        <h6>Contact Us</h6>
        <ul>
          <li className={classes.li}>Email: xxxxx@Northeastern.edu</li>
          <li className={classes.li}>Tel: +1 (123) 456-789</li>
          <li className={classes.li}>Fax: xxxxxxx</li>
        </ul>
        </Col>
      </Row>
      <hr className={classes.hr}/>
      <Row>
        <Col>
          <p className={classes.li}>&copy; {new Date().getFullYear} CS5500 Team | All Right Reserved</p>
        </Col>
      </Row>
    </div>
  )
}

export default Footer