import React, { Component } from 'react';
import {Container, Row, Col,
FormGroup, FormControl, Button, Table} from 'react-bootstrap';
import '../../assets/css/search.css'

class Search extends Component {
  constructor(props, context) {
    super(props,context);

    this.state = {
      preIngredients:"",
      cantidad:"",
      medition:"",
      ingredients: []
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async() => {
    var data = {
      ingredients: this.state.preIngredients,
      cantidad: this.state.cantidad + this.state.medition
    }
    this.state.ingredients.push(data)
    this.setState({preIngredients: "", cantidad:""})
  }

  render() {    
    return (
      <div className="App">
      
        <h1>ChefMe</h1>
        <div className = "input-ingredient">
          <Container>
            <Row>
              <form>
                <Col xs={8} md={5}>
                <FormGroup bsSize="large">
                  <FormControl 
                    type="text"
                    value={this.state.preIngredients}
                    placeholder= "Enter your ingredient"
                    onChange= {this.handleChange}
                    name= "preIngredients"
                    />
                  </FormGroup>
                </Col>
                <Col xs={4} md={2}>
                <FormGroup bsSize="large">
                  <FormControl 
                    type="text"
                    value={this.state.cantidad}
                    placeholder= "Cuantity"
                    onChange= {this.handleChange}
                    name= "cantidad"
                    />
                  </FormGroup>
                </Col>
                <Col xs={4} md={2}>
                  <FormGroup bsSize="large">
                    <FormControl componentClass="select" placeholder="Medition" name="medition" onChange={this.handleChange} value={this.state.medition}>
                      <option value="kg">kg</option>
                      <option value="gr">gr</option>
                      <option value="lt">lt</option>
                      <option value="ml">ml</option>
                      <option value="pzs">pzs</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col xs={4} md={3}>
                  <Button type="button" bsSize="large" onClick={() => this.handleSubmit()} >Add Ingredient</Button>
                </Col>
              </form>
            </Row> 
          </Container>
        </div>
        <div className= "send">
          <Container id="menu">
            <Table responsive>
              <tbody>
              </tbody>
            </Table>
          </Container>
          <br></br>
          <Button type="button" bsSize="large" onClick={() => console.log(this.state)}>Search Recipe</Button>
        </div>
      </div>
    );
  }
}

export default Search;
