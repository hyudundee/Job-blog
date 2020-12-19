import React from 'react'
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap'
import { Link } from 'react-router-dom'
import classes from './ArticleCard.module.css'


// Convert mm to Year, Month and Day
export function timeStampToString(ts) {
  const date = new Date(ts * 1000)
  return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
}

const ArticleCard = (props) => {
  return (
    <ListGroupItem className={classes.ArticleCard}>
        <Link className={classes.Link} to={{
            pathname: 'article/' + props.data.id,
            state: { article: props.data }
        }}>
        <ListGroupItemHeading className={classes.CardTitle}>{props.data.title}</ListGroupItemHeading>
        <ListGroupItemText className={classes.CardText}>
            {props.data.jobtype 
            + "  |  " + props.data.company 
            + "  |  " + props.data.author}
        </ListGroupItemText>
        <div className={classes.CardDate}>{timeStampToString(props.data.createDate.seconds)}</div>
      </Link>
    </ListGroupItem>
  )
}

export default ArticleCard

