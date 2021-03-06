import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import styles from './FavoriteQuotesViewStyles';

import Navigation from '../../components/Navigation/Navigation';
import SortableQuoteList from '../../components/SortableQuoteList/SortableQuoteList';

class FavoriteQuotesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      deletingId: '',
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  openDialog = id => {
    this.setState({ openDeleteDialog: true, deletingId: id });
  };

  closeDialog = () => {
    this.setState({ openDeleteDialog: false, deletingId: '' });
  };

  handleDelete = () => {
    const { removeQuote } = this.props;
    const { deletingId } = this.state;
    removeQuote(deletingId);
    this.closeDialog();
  };

  render() {
    const { favoriteQuotes, onSortEnd, history, classes } = this.props;
    const { openDeleteDialog } = this.state;
    const sortableQuoteList = (
      <SortableQuoteList
        axis="xy"
        distance={20}
        onSortEnd={onSortEnd}
        favoriteQuotes={favoriteQuotes}
        openDialog={this.openDialog}
      />
    );
    const message = (
      <div className={classes.message}>
        <p className={classes.heartBrokenIcon}>
          <FontAwesomeIcon icon={faHeartBroken} />
        </p>

        <h1>It looks like you have not added any quotes to favorites yet.</h1>
      </div>
    );
    return (
      <div className={classes.FavoriteQuotes}>
        <Navigation title="Favorite Quotes" history={history} />
        <div className="scrollableContainer" />
        {favoriteQuotes.length > 0 ? sortableQuoteList : message}

        <Dialog
          open={openDeleteDialog}
          aria-labelledby="delete-dialog-title"
          onClose={this.closeDialog}
        >
          <DialogTitle id="delete-dialog-title">
            Do you want to remove this quote from favorites?
          </DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{ background: 'hotpink', color: 'black' }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{ background: 'aquamarine', color: 'black' }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

FavoriteQuotesView.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  removeQuote: PropTypes.func.isRequired,
  onSortEnd: PropTypes.func.isRequired,
  favoriteQuotes: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(styles)(FavoriteQuotesView);
