import React from 'react';
import {
  makeStyles,
  Container,
  Paper,
  TextField,
  Input,
  Grid,
  Button,
} from '@material-ui/core';
import { app } from '../Firebase/Firebase';
import 'firebase/storage';
import 'firebase/firestore';
import { AuthContext } from '../Context/globalAuth';

import DialogImage from './DialogImage';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '50vh',
    padding: 10,
    '& h1': { textAlign: 'center' },
    '& h3,p': { textAlign: 'center' },
  },
  innerContainer: { padding: 10, '& *': { marginTop: 10 } },
  currentProjects: {
    padding: 10,
    marginTop: 10,
    '& h3,p': { textAlign: 'center' },
  },
  signOut: {
    marginBottom: 10,
  },
}));

const Home = () => {
  const classes = useStyles();
  const [albumName, setalbumName] = React.useState('');
  const [images, setImages] = React.useState([]);

  const [getData, setData] = React.useState([]);
  const [isShow, setShow] = React.useState(false);
  const [currentData, setCurrentData] = React.useState(null);
  const { currentUser } = React.useContext(AuthContext);

  const fileChangesHandler = (event) => {
    if (event.target.files.length) {
      let temp = [];
      for (let i = 0; i < event.target.files.length; i++) {
        temp.push(event.target.files[i]);
      }
      setImages(temp);
    }
  };

  const uploadAsPromises = () => {
    let imageUrlstTemp = [];
    let promises = [];
    images.forEach((file) => {
      const uploadTask = app
        .storage()
        .ref(`${albumName}/${file.name}`)
        .put(file);
      promises.push(uploadTask);
      imageUrlstTemp.push(
        `https://firebasestorage.googleapis.com/v0/b/utech-file-upload.appspot.com/o/${albumName}%2F${file.name}?alt=media`
      );
    });

    Promise.all(promises)
      .then(() => firestoreDataUpload(imageUrlstTemp))
      .catch(console.error);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    uploadAsPromises();
  };

  const firestoreDataUpload = (imageUrlstTemp) => {
    app
      .firestore()
      .collection('albums')
      .add({
        uid: currentUser.userUid,
        albumName: albumName,
        albumImages: imageUrlstTemp,
      })
      .then(() => window.location.reload())
      .catch(console.error);
  };

  const getCurrentProjects = () => {
    let albumsData = [];
    app
      .firestore()
      .collection('albums')
      .where('uid', '==', currentUser.userUid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((document) => {
          albumsData.push(document.data());
        });
        setData(albumsData);
      })
      .catch(console.error);
  };

  const signOut = () => {
    app
      .auth()
      .signOut()
      .then(() => window.location.reload())
      .catch(console.error);
  };

  const switchDialog = (elem) => {
    setShow(!isShow);
    setCurrentData(elem);
  };
  React.useEffect(getCurrentProjects, []);
  return (
    <React.Fragment>
      <Container maxWidth='lg'>
        <Button
          onClick={signOut}
          className={classes.signOut}
          variant='contained'
          color='secondary'
        >
          Sign Out
        </Button>
      </Container>
      <Container maxWidth='md'>
        <Paper className={classes.root}>
          <h3>
            Welcome {currentUser.userName},how are you doing? Please Upload your
            work here
          </h3>
          <p>Upload multiple files if they are, and also your album name</p>
          <Container maxWidth='sm' className={classes.innerContainer}>
            <form onSubmit={submitHandler}>
              <TextField
                label='Your Album Name'
                type='text'
                name='AlbumName'
                fullWidth
                required
                variant='outlined'
                onChange={(event) => setalbumName(event.target.value)}
              />
              <Input
                inputProps={{ multiple: 'multiple' }}
                fullWidth
                type='file'
                multiple
                required
                accept='image/jpeg'
                onChange={fileChangesHandler}
              />
              <button type='submit'>Done</button>
            </form>
          </Container>
        </Paper>
        <Paper className={classes.currentProjects}>
          <h3>Your Current Work</h3>
          <Grid container justify='space-evenly' alignItems='center'>
            {getData
              ? getData.map((elem) => {
                  return (
                    <Grid
                      onClick={() => {
                        switchDialog(elem);
                      }}
                      component={Paper}
                      item
                      md={3}
                    >
                      {isShow ? (
                        <DialogImage
                          data={currentData}
                          open={isShow}
                          handleClose={() => setShow(!isShow)}
                        />
                      ) : (
                        ''
                      )}
                      <img
                        src={elem.albumImages[0]}
                        width='200px'
                        height='200px'
                        alt={`imageid${Math.random()}`}
                      />
                      <p>{elem.albumName}</p>
                    </Grid>
                  );
                })
              : ''}
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default Home;
