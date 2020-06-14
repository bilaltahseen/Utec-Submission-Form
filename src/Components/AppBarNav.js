import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { app } from '../Firebase/Firebase';
import { Grid, Link } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 20,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const AppBarNav = (props) => {
  const classes = useStyles();
  const signOut = () => {
    app
      .auth()
      .signOut()
      .then(() => window.location.reload())
      .catch(console.error);
  };
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Grid container alignItems='cente' spacing={0}>
            <Grid item md={10}>
              <Button
                onClick={signOut}
                className={classes.signOut}
                variant='contained'
                color='secondary'
              >
                Sign Out
              </Button>
            </Grid>

            <Grid item md={2}>
              <Button
                onClick={() => props.history.push('/Page1')}
                color='inherit'
              >
                Page 1
              </Button>

              <Button
                onClick={() => props.history.push('/Page2')}
                color='inherit'
              >
                Page 2
              </Button>
              <Button
                onClick={() => props.history.push('/Page3')}
                color='inherit'
              >
                Page 3
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(AppBarNav);
