import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Form, Container, Result } from "./styles";
import api from "../../services/api";
import Logo from "../../assets/paw.svg";


class Dashboard extends Component {
    state = {
        dataBanho: "",
        qtdCaesPequenos: "",
        qtdCaesGrandes: "",
        error: ""
    };

    handleSignUp = async e => {
        e.preventDefault();
        const { dataBanho, qtdCaesPequenos, qtdCaesGrandes } = this.state;
        if (!dataBanho || !qtdCaesPequenos || !qtdCaesGrandes) {
            this.setState({ error: "Preencha todos os dados para se cadastrar" });
        } else {
            try {
                await api.post("/", { dataBanho, qtdCaesPequenos, qtdCaesGrandes });
                this.props.history.push("/");
            } catch (err) {
                console.log(err);
                this.setState({ error: "Ocorreu um erro ao fazer busca." });
            }
        }
    };

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSignUp}>
                    <img src={Logo} alt="logo canil seu eduardo" />
                    {this.state.error && <p>{this.state.error}</p>}
                    <input
                        type="date"
                        onChange={e => this.setState({ dataBanho: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Quantidade de cães pequenos"
                        onChange={e => this.setState({ qtdCaesPequenos: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Quantidade de cães grandes"
                        onChange={e => this.setState({ qtdCaesGrandes: e.target.value })}
                    />
                    <button type="submit">Buscar melhor petshop</button>
                    <hr />
                </Form>
                <Result>
                    <p>Melhor petshop para o orçamento de </p>
                    <span>Nome do melhor canil: </span>
                    <span>Preço total dos banhos: </span>
                </Result>
            </Container>
        );
    }
}

export default withRouter(Dashboard);