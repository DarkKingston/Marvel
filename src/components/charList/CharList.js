import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,    
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.allChar();
    }

    allChar = () => {
        this.marvelService.getAllCharacters()
            .then(data => {
                const charList = data.map(val => {

                    
                    return (
                                <li className="char__item"  
                                key={val.id}
                                onClick={() => this.props.onCharSelected(val.id)}>
                                    <img src={val.thumbnail} alt="Hero_image" />
                                    <div className="char__name">{val.name}</div>
                                </li>
                    )
                });
                this.setState({ charList, loading: false });
            })
            .catch(() => {
                this.setState({ error: true, loading: false });
            });
    }

    render() {
        const { charList, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? charList : null;

        return (
            <div className="char__list">
                
                <ul className="char__grid">
                {errorMessage}
                {spinner}
                {content}
                </ul>
                
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}
export default CharList;