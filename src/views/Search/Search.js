import React, { Component } from 'react';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import Navbar from '../../components/Navbar/Navbar'
import '../../assets/css/search.css'

class Search extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      preIngredients: '',
      cantidad: '',
      medition: 'kg',
      ingredients: [],
      disabled: true
    };
  }

  handleChange = (e) => {
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
    if (this.state.ingredients.length >= 3) {
      this.setState({ disabled: false })
    }
  }

  deleteIngredient = (index) => {
    let auxiliarArray = [...this.state.ingredients]
    auxiliarArray.splice(index, 1)

    this.setState({ ingredients: auxiliarArray })

    if (this.state.ingredients.length < 4) {
      this.setState({ disabled: true })
    }
  }

  searchRecipes = () => {
    this.props.history.push('/search/result')
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <h1>ChefMe</h1>
        <div className='input-ingredient'>
          <Row>
            <Col>
              <Form className='form' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

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

                <Form.Group controlId="formGridState" className='input'>
                  <Form.Label>Unit</Form.Label>
                  <Form.Control as="select"
                    name="medition"
                    onChange={this.handleChange}
                    value={this.state.medition}>
                    <option value="kg">kg</option>
                    <option value="gr">gr</option>
                    <option value="lt">lt</option>
                    <option value="ml">ml</option>
                    <option value="pzs">pzs</option>
                  </Form.Control>
                </Form.Group>
                <div className='buttonContainer'>
                  <Button type="button" className='addIngredienteButtom' onClick={() => this.handleSubmit()} >Add Ingredient</Button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
        <div className="send" style={{ marginBottom: 40 }}>
          <div id="menu">
            <Table responsive>
              <tbody>
                <tr>
                  <th>Ingredient</th>
                  <th>Cuantity</th>
                  <th>Medition</th>
                </tr>

                {
                  this.state.ingredients.map((i, key) => {
                    return (
                      <tr>
                        <td>{i.ingredients}</td>
                        <td>{i.cantidad}</td>
                        <td>{i.medition}</td>
                        <td><Button type='button' onClick={() => this.deleteIngredient(key)}>Delete</Button></td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </Table>
          </div>
          <br></br>
          <Button type="button" onClick={this.searchRecipes} disabled={this.state.disabled}>Search Recipe</Button>
        </div>
      </div>
    );
  }
}

export default Search;
