import React from 'react';
import { Col, Row } from 'reactstrap';

const RowBlock = ({ list, details }) => {
    return (
        <Row>
            <Col md='6'>
                {list}
            </Col>
            <Col md='6'>
                {details}
            </Col>
        </Row>
    )
}

export default RowBlock;