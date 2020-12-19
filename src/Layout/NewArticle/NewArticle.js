import React, { Component } from 'react'
import {Container, Row, Col, Card, CardBody, FormGroup, Label, Input, Button, CardHeader} from 'reactstrap'
import classes from './NewArticle.module.css'
import Compressor from 'compressorjs'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import firebase from '../../Config/firebase'
import {v4 as uuidv4} from 'uuid'
import AudioWorker from './AudioWorker/AudioWorker'
import 'firebase/storage';

const Quill = ReactQuill.Quill
const BlockEmbed = Quill.import('blots/block/embed')

const db = firebase.firestore()
const storageRef = firebase.storage()

class AudioBlot extends BlockEmbed{
    static create(url) {
      let node = super.create()
      node.setAttribute('src', url)
      node.setAttribute('controls', '')
      return node
    }

    static value(node) {
      return node.getAttribute('src')
    }
}

AudioBlot.blotName = 'audio'
AudioBlot.tagName = 'audio'
Quill.register(AudioBlot)

class NewArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article:{
                title: '',
                content: '',
                createDate: new Date(),
                lastModified: new Date(),
                featureImage: '',
                createUserID: '',
                author: '',
                jobtype: '',
                company: ''

            }
        }
    }

    modules = {
        toolbar: {
            container: [
                [{'header': '1'}, {'header':'2'}, {'font':[]}],
                [{size:[]}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list':'bullet'}, {'indent':'-1'}, {'indent':'+1'}],
                ['link', 'image'],
                ['clean'], ['code-block']
            ],
            handlers: {
              'image': () => this.quillImageCallBack()
            }
        },
        clipboard: {
            matchVisual: false,
        },
    }

    formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
        'code-block', 'audio'
    ]

    // On change updating for title input
    onChangeArticleTitle = (value) => {
        this.setState({
            article: {
                ...this.state.article,
                title: value
            }
        })
    }

    // On change updating for content input
    onChangeArticleContent = (value) => {
        this.setState({
            article: {
                ...this.state.article,
                content: value
            }
        })
    }

    // On change updating for job type input
    onChangeJobType = (val) => {
        this.setState({
            article: {
                ...this.state.article,
                jobtype: val
            }
        })
    }

    // On change updating for company input
    onChangeCompany = (val) => {
        this.setState({
            article: {
                ...this.state.article,
                company: val
            }
        })
    }

    // Submit article after filling job post information
    submitArticle = () => {
        var cur = this.props
        if (this.props.location.state !== undefined) {
            const article = this.state.article
            article.author = this.props.auth.displayName
            article.createUserID = this.props.auth.uid
            db.collection("Articles").doc(this.props.location.state.article.id)
                .update(article)
                .then(function() {
                    cur.history.push('/')
                })
        } else {
            const article = this.state.article
            article.author = this.props.auth.displayName
            article.createUserID = this.props.auth.uid
            db.collection("Articles")
                .add(article)
                .then(
                    this.props.history.push('/')
                )
        }
        
    }

    fileCompress = (file) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                file: 'File',
                quality: 0.5,
                maxWidth: 640,
                maxHeight: 640,
                success(file) {
                    return resolve({
                      success: true,
                      file: file
                    })
                },
                error(err) {
                  return resolve({
                    success: false,
                    message: err.message
                  })
                }
            })
        })
    }

    quillImageCallBack = () => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()
        input.onchange = async () => {
            const file = input.files[0]
            const compressState = await this.fileCompress(file)
            if(compressState.success) {
                const fileName = uuidv4()
                storageRef.ref().child("Articles/" + fileName).put(compressState.file)
                .then(async snapshot => {
                    const downloadURL = await storageRef.ref().child("Articles/" + fileName).getDownloadURL()
                    let quill = this.quill.getEditor()
                    const range = quill.getSelection(true)
                    quill.insertEmbed(range.index, 'image', downloadURL)
                })
            }
        }
    }
    uploadImageCallBack = (e) => {
        return new Promise(async(resolve, reject) => {
            const file = e.target.files[0]
            const fileName = uuidv4()
            storageRef.ref().child("Articles/" + fileName).put(file)
            .then(async snapshot => {
                const downloadURL = await storageRef.ref().child("Articles/" + fileName).getDownloadURL()
                resolve({
                    success: true,
                    data: {link: downloadURL}
                })
            })
        })
    }

    insertTTSAudio = (soundURL) => {
        let quill = this.quill.getEditor()
        const range = quill.getSelection(true)
        let position = range ? range.index : 0
        quill.insertEmbed(position, 'audio', soundURL, 'user')
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xl={9} lg={9} md={8} sm={12} xs={12}>
                        <h2 className={classes.SectionTitle}>New Article</h2>
                        <FormGroup>
                            <Label className={classes.SectionTitle}> Article Title </Label>
                            <Input type='text' name='articleTitle' od='articleTitle' placeholder='Enter title here...'
                                   onChange={(e) => this.onChangeArticleTitle(e.target.value)}
                                   value={this.state.article.title}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label className={classes.SectionTitle}> Article Content </Label>
                            <AudioWorker insertTTSAudio={this.insertTTSAudio}/>
                            <ReactQuill
                                ref={(el) => this.quill = el}
                                value={this.state.article.content}
                                onChange={(e) => this.onChangeArticleContent(e)}
                                theme='snow'
                                modules={this.modules}
                                formats={this.formats}
                            />
                        </FormGroup>
                    </Col>
                    <Col xl={3} lg={3} md={4} sm={12} xs={12}>
                        <Card>
                            <CardHeader>Article Setting</CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <Label className={classes.Label}>Select Job Type</Label>
                                    <Input type='select' name='jobtype' id='jobtype'
                                           onChange={(e) => this.onChangeJobType(e.target.value)}
                                    >
                                        <option> </option>
                                        <option>New Graduate</option>
                                        <option>Internship</option>
                                    </Input>

                                </FormGroup>

                                <FormGroup>
                                    <Label className={classes.Label}>Enter Company Name</Label>
                                    <Input type='text' name='company' id='company' placeholder='eg. Google'
                                        onChange={(e) => this.onChangeCompany(e.target.value)}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label className={classes.Label}>Feature Image</Label>
                                    <Input type="file" accept="image/*" className={classes.ImageUploader}
                                    onChange={async (e) => {
                                        const uploadState = await this.uploadImageCallBack(e)
                                        if (uploadState.success){
                                            this.setState({
                                                hasFeatureImage: true,
                                                article:{
                                                    ...this.state.article,
                                                    featureImage: uploadState.data.link
                                                }
                                        })

                                        }
                                    }}>
                                    </Input>
                                    {
                                        this.state.hasFeatureImage?
                                            <img src={this.state.article.featureImage} className={classes.FeatureImg}/> : ''
                                    }

                                </FormGroup>
                                <FormGroup>
                                    <Button color='danger'
                                        onClick={(e) => this.submitArticle()}
                                    >
                                        Submit
                                    </Button>
                                </FormGroup>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Container>
        )
    }
}

export default NewArticle
