import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Container } from "./styles";
import { login } from "../../services/auth";
import api from "../../services/api";
import Logo from "../../assets/paw.svg";


class SignIn extends Component {
    state = {
        email: "",
        password: "",
        error: ""
    };

    handleSignIn = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        if (!email || !password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            try {
                const response = await api.post("/sessions", { email, password });
                login(response.data.token);
                this.props.history.push("/app");
            } catch (err) {
                this.setState({
                    error:
                        "Houve um problema com o login, verifique suas credenciais."
                });
            }
        }
    };

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSignIn}>
                    <img src={Logo} alt="logo canil seu eduardo" />
                    {this.state.error && <p>{this.state.error}</p>}
                    <input
                        type="email"
                        placeholder="Endereço de e-mail"
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                    <button type="submit">Entrar</button>
                    <hr />
                    <Link to="/signup">Criar conta</Link>
                </Form>
            </Container>
        );
    }
}

export default withRouter(SignIn);