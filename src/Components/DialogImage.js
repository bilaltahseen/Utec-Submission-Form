import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogImage(props) {
  return (
    <div>
      <Dialog
        fullWidth
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {props.data.albumName}
        </DialogTitle>
        <DialogContent>
          {props.data.albumImages.map((image) => {
            return (
              <center>
                <img
                  alt={`imageid${Math.random()}`}
                  width='300px'
                  height='300px'
                  src={image}
                />
              </center>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color='primary' autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
