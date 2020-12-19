import React, { Component } from 'react'
import { ListGroup } from 'reactstrap'
import ArticleCard from '../../../Component/ArticleCard/ArticleCard'
import firebase from '../../../Config/firebase'
import {InputGroup,Input } from 'reactstrap';

const db = firebase.firestore()
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            articles: [],
            filter: "",
        }
    }

    componentDidMount() {
        this.getMyArticle(this.state.filter)
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.filter !== prevState.filter){
            this.getMyArticle(this.state.filter)
        }
    }

    onChangeFilter = (val) => {
        this.setState(
          {filter: val}
        )
    }

    // Get articles and load it to the state 
    getMyArticle = (filter) => {
        db
            .collection('Articles')
            .orderBy('createDate', 'desc')
            .limit(9)
            .get()
            .then(docs => {
                if (!docs.empty) {
                    let allArticles = []
                    docs.forEach(function (doc) {
                        const article = {
                            id: doc.id,
                            ...doc.data()
                        }
                        if (filter === "" || filter.toLowerCase() === article.company.toLowerCase()){
                            allArticles.push(article)
                        }
                        
                    })

                    this.setState({
                        articles: allArticles
                    }, () => {
                        this.setState({
                            isLoaded: true
                        })
                    })
                }
            })
    }

    // Convert ms to year, month and day
    timeStampToString(ts) {
        const date = new Date(ts * 1000)
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
    }
    

    render() {
        return (
            <div>
                <InputGroup>
                    <Input type='text' placeholder="Type company name here, eg.'Google' The page will auto-update!" onChange={(e) => this.onChangeFilter(e.target.value)} /> 
                </InputGroup>
                <ListGroup>
                    {
                        this.state.isLoaded ?
                            this.state.articles.map((article, index) => {
                                return (
                                    <ArticleCard
                                        key={index}
                                        data={article}
                                    />                            
                                )
                            }) : ''
                    }
                </ListGroup>
            </div>
        )
    }
}

export default Main
