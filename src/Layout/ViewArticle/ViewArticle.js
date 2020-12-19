import React, { Component } from 'react'
import classes from './ViewArticle.module.css'
import { withRouter } from 'react-router-dom'
import parse from 'html-react-parser'
import { Container, Badge, Button } from 'reactstrap';
import firebase from '../../../src/Config/firebase'
import { Link } from 'react-router-dom'
const db = firebase.firestore()


class ViewArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {},
            isLoaded: false
        }
    }

    componentDidMount() {
        if (typeof this.props.location.state !== 'undefined') {
            if (this.props.location.state.hasOwnProperty('article')) {
                this.setState({
                    article: this.props.location.state.article
                }, () => {
                    this.setState({
                        isLoaded: true
                    })
                })
            }
        } else {
            this.getArticleByID(this.props.match.params.id)
        }
    }

    // Get API call for getting getting job posts
    // Load datas to our state
    getArticleByID = (aid) => {
        db.collection( 'Articles').doc(aid).get()
        .then(doc => {
            if (doc.exists){
                this.setState({article:doc.data()}, () => {
                    this.setState({isLoaded: true})
                }
                )
            } else {
                this.props.history.push({pathname: '/'})
            }
        })
    }

    timeStampToString = (ts) => {
        const date = new Date(ts * 1000)
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
    }

    // Delete API call for deleting the post using 'id'
    deleteArticle = (id) => {
        var cur = this.props
        db.collection("Articles").doc(id).delete().then(function () {
            cur.history.push('/')
        })
    }

    // Role check for Delete/Edit permission for users
    showDelete = (author) => {
        var user = firebase.auth().currentUser;
        if (user) {
            if (author === user.displayName) {
                return true;
            }
        }
        return false;
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <Container>
                    <div className={classes.Article}>
                        <div className={classes.ImageContainer}>
                            {this.state.article.featureImage?
                            <img className={classes.Image}
                                src={this.state.article.featureImage}
                                alt={this.state.article.title}
                            />
                            :<img className={classes.Image}
                                src="https://placeimg.com/800/300/321"
                                alt={this.state.article.title}
                            />
                            }
                            
                            <div className={classes.ArticleInfo}>
                                <h1 className={classes.Title}>
                                    {this.state.article.title}

                                </h1>
                                <div className={classes.Date}>
                                    {this.timeStampToString(this.state.article.lastModified.seconds)}
                                </div>
                                {
                                    this.state.article.author?
                                        <div className={classes.Author}>
                                            Published by {this.state.article.author}
                                        </div> 
                                        : ""
                                }
                                
                                <Badge className={classes.ArticleLabel}>
                                {this.state.article.company}
                                </Badge>
                                <Badge className={classes.ArticleLabel}>
                                {this.state.article.jobtype}
                                </Badge>
                                {
                                    this.showDelete(this.state.article.author) ?
                                        <Link to={{
                                            pathname: '/edit-article',
                                            state: { article: this.state.article }
                                        }}>
                                            <Button outline color="info" className={classes.ArticleDelete}>
                                                Edit
                                            </Button>
                                        </Link> : ""
                                }
                                {
                                    this.showDelete(this.state.article.author) ?
                                        <Button outline color="danger" className={classes.ArticleDelete} onClick={(e) => this.deleteArticle(this.state.article.id)}>
                                            Delete
                                        </Button> : ""
                                }

                            </div>
                        </div>

                        <div className={classes.ArticleMain}>
                            {parse(this.state.article.content)}
                        </div>

                    </div>

                </Container>
            );
        } else {
            return (
                <div>
                    loading..
                </div>
            );
        }

    }
}

export default withRouter(ViewArticle)
