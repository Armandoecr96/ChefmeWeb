import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import '../../assets/css/search.css'

class Search extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      preIngredients: "",
      cantidad: "",
      medition: "",
      ingredients: []
    };
  }

  handleChange = (e) => {
    console.log(e)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async () => {
    var data = {
      ingredients: this.state.preIngredients,
      cantidad: this.state.cantidad,
      medition: this.state.medition
    }
    this.state.ingredients.push(data)
    this.setState({ preIngredients: "", cantidad: "" })
  }

  render() {
    return (
      <div className="App">
        <h1>ChefMe</h1>
        <Container className='input-ingredient'>
          <Row>
            <Col xs={12} md={12}>
              <Form className='form'>
                <Form.Group className='input'>
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control
                    className='input'
                    type='text'
                    placeholder='Ingredients'
                    name='preIngredients'
                    value={this.state.preIngredients}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group className='input'>
                  <Form.Label>Cuantity</Form.Label>
                  <Form.Control
                    type='text'
                    name='cantidad'
                    value={this.state.cantidad}
                    placeholder="Cuantity"
                    onChange={this.handleChange} />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState" className='input'>
                  <Form.Label>State</Form.Label>
                  <Form.Control as="select"
                    name="medition" onChange={this.handleChange} value={this.state.medition}>
                    <option value="kg">kg</option>
                    <option value="gr">gr</option>
                    <option value="lt">lt</option>
                    <option value="ml">ml</option>
                    <option value="pzs">pzs</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='formBasicChecbox'>
                </Form.Group>
                <div className='buttonContainer'>
                  <Button type="button" className='addIngredienteButtom' onClick={() => this.handleSubmit()} >Add Ingredient</Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
        <div className="send">
          <Container id="menu">
            <Table responsive>
              <tbody>
                <tr>
                  <th>Ingredient</th>
                  <th>Cuantity</th>
                  <th>Medition</th>
                </tr>

                {
                  this.state.ingredients.map((i) => {
                    return (
                      <tr>
                        <td>{i.ingredients}</td>
                        <td>{i.cantidad}</td>
                        <td>{i.medition}</td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </Table>
          </Container>
          <br></br>
          <Button type="button" onClick={() => console.log(this.state)}>Search Recipe</Button>
        </div>
      </div>
    );
  }
}

export default Search;
