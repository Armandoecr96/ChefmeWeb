import React, { Component } from 'react'
import { FormControl, Button } from 'react-bootstrap'
import Navbar from '../../components/Navbar/Navbar'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Select from 'react-select'

class EditRecipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            instructions: '',
            image: '',
            category: '',
            profile: '',
            categoriesToRender: []
        }
    }

    componentDidMount = () => {
        fetch('http://localhost:8080/categorias', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(response => {
            response.json().then(
                json => {
                    let categories = [...json]
                    this.setState({ categoriesToRender: categories })
                }
            )
        })
        let id = this.props.match.params.id
        fetch('http://localhost:8080/recetas/receta/' + id, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(response => {
            response.json().then(
                json => {
                    this.setState({
                        name: json.title,
                        category: json.categoria_id,
                        instructions: json.preparation
                    })
                }
            )
        })
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
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleChangeSelect = (value, obj) => {
        this.setState({
            [obj.name]: value
        })
    }

    editRecipe = () => {
        fetch('http://localhost:8080/recetas', {
            method: 'put',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
                'Access-Control-Allow-Methods': 'PUT'
            },
            body: JSON.stringify({
                // id_receta: parseInt(this.props.match.params.id, 10),
                titulo: this.state.name,
                preparacion: this.state.instructions,
                image: this.state.image,
                verified: 0,
                calification: 0,
                categoria_id: parseInt(this.state.category.value, 10),
                usuario_id: parseInt(this.state.profile, 10)
            }),
        }).then(response => {
            if (response.status === 200) {
                response.json().then(json => {
                    alert('Receta editada')
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

        if (this.state.category !== undefined && this.state.categoriesToRender !== []) {
            const filter = this.state.categoriesToRender.filter(id => id.categoria_id === this.state.category)
            if (filter[0] !== undefined) {
                let validate = {
                    value: filter[0].categoria_id,
                    label: filter[0].name
                }
                this.setState({ category: validate })
            }
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
                        data={this.state.instructions}
                        config={configCKE}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            this.setState({ instructions: data })
                        }}
                    />
                    <div style={{ marginTop: 32 }}>
                        <Button onClick={this.editRecipe}>Create Recipte</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditRecipe
