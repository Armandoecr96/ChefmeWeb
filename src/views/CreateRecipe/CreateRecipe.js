import React, { Component } from 'react'
import { FormControl, Button } from 'react-bootstrap'
import Navbar from '../../components/Navbar/Navbar'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Select from 'react-select'

class CreateRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      instructions: '',
      image: '',
      category: '',
      profile: '',
      categoriesToRender: []
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:8080/usuarios/' + localStorage.getItem('name'), {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).then(response => {
      response.json().then(
        json => {
          let profile = json
          this.setState({ profile: profile.idusuario })
        }
      )
    })
    fetch('http://localhost:8080/categorias', {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).then(response => {
      response.json().then(
        json => {
          let categories = [...json]
          console.log(categories)
          this.setState({ categoriesToRender: categories })
        }
      )
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleChangeSelect = (value, obj) => {
    console.log(obj, value)
    this.setState({
      [obj.name]: value
    })
  }

  createRecipe = () => {
    fetch('http://localhost:8080/recetas', {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        titulo: this.state.name,
        preparacion: this.state.instructions,
        image: this.state.image,
        verified: 0,
        calification: 0,
        categoria_id: parseInt(this.state.category.value, 10),
        usuario_id: parseInt(this.state.profile, 10)
      }),
    }).then(response => {
      if (response.status === 201) {
        response.json().then(json => {
          alert('Receta creada')
          this.props.history.push('/profile')
        })
      }
      if (response.status === 404) {
        alert('No existe el usuario')
      }
    })
  }

  render() {
    const configCKE = {
      toolbar: ['bold', 'italic', '|', 'numberedList', 'bulletedList', 'undo', 'redo']
    }
    return (
      <div>
        <Navbar />
        <div style={{ padding: 16 }}>
          <div style={{ marginTop: 32, marginBottom: 32 }}>
            <h2>Recipe Name</h2>
            <FormControl
              placeholder="Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div style={{ marginBottom: 32 }}>
            <h2>Category</h2>
            <Select
              name='category'
              value={this.state.category}
              onChange={this.handleChangeSelect}
              options={
                this.state.categoriesToRender && this.state.categoriesToRender.map((cat) => {
                  return {
                    value: cat.categoria_id,
                    label: cat.name
                  }
                })
              }
            />
          </div>
          <CKEditor
            editor={ClassicEditor}
            name='about'
            config={configCKE}
            onChange={(event, editor) => {
              const data = editor.getData();
              this.setState({ instructions: data })
            }}
          />
          <div style={{ marginTop: 32 }}>
            <Button onClick={this.createRecipe}>Create Recipte</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateRecipe
