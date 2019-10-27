import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography, Button } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import '../styles/client-modal.scss';
import useForm from 'react-hook-form';
import { schema } from '../schemas/clients.schema';
import ErrorLabel from '../../../components/ErrorLabel';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalHeader = ({ handleClose }) => (
  <AppBar position="relative" elevation={0}>
    <Toolbar>
      <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
        <span className="material-icons">close</span>
      </IconButton>
      <Typography>Registro de Usuario</Typography>
      <div style={{ flexGrow: 1 }}></div>
      <Button edge="start" color="inherit" aria-label="close" type="submit">
        <span className="material-icons">save</span> Guardar
      </Button>
    </Toolbar>
  </AppBar>
);
export default function ClientModal({
  open = false,
  handleClose = () => {},
  handleSave = () => {}
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema
  });
  const onSubmit = data => {
    handleSave(data);
    handleClose();
    console.log(data);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      className="client-modal"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {open && (
          <>
            <ModalHeader handleClose={handleClose} />
            <Grid container spacing={0} className="client-modal__content">
              <Grid item sm={12} xs={6}>
                <TextField
                  name="firstname"
                  label="Nombres"
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    ref: register
                  }}
                  error={!!errors.firstname}
                />
                <ErrorLabel>{errors.firstname && errors.firstname.message}</ErrorLabel>
              </Grid>
              <Grid item sm={12} xs={6}>
                <TextField
                  name="lastname"
                  label="Apellidos"
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    ref: register
                  }}
                  error={!!errors.lastname}
                />
                <ErrorLabel>{errors.lastname && errors.lastname.message}</ErrorLabel>
              </Grid>
              <Grid item sm={12} xs={6}>
                <TextField
                  type="date"
                  name="birthday"
                  label="Fecha de nacimiento"
                  margin="normal"
                  fullWidth
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    ref: register
                  }}
                  error={!!errors.birthday}
                />
                <ErrorLabel>{errors.birthday && errors.birthday.message}</ErrorLabel>
              </Grid>
            </Grid>
          </>
        )}
      </form>
    </Dialog>
  );
}
