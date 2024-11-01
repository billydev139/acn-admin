import React from 'react';
import { Modal, Box, Typography, Stack, Avatar, Paper, ListItemText, Link, Fade, IconButton, Grid } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';

const ViewModal = ({ open, handleClose, data }) => (
    <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Fade in={open}>
            <Box
                sx={{
                    width: '70%',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        zIndex: "100",
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        color: 'grey.500',
                    }}
                >
                    <GridCloseIcon />
                </IconButton>
                {/* Paper with Background Image */}
                <Paper
                    elevation={3}
                    sx={{
                        position: 'relative',
                        padding: 4,
                        borderRadius: 2,
                        backgroundImage: 'url(/assets/images/mock/cover/cover-15.webp)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'top',
                    }}
                >
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                            alt="User Avatar"
                            sx={{
                                width: 100,
                                height: 100,
                                position: 'absolute',
                                bottom: -40,
                                left: '5%',
                                transform: 'translateX(-10%)',
                                border: '3px solid white',
                                boxShadow: 3,
                            }}
                        >
                            {data?.name?.charAt(0).toUpperCase()}
                        </Avatar>

                        <Box sx={{ ml: 20 }}>
                            <ListItemText
                                primary={
                                    <Typography variant="h6" color="white">
                                        {data?.name?.toUpperCase()}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="body2" color="white">
                                        {data?.email?.toLowerCase()}
                                    </Typography>
                                }
                            />
                        </Box>
                    </Stack>
                </Paper>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} md={6}>
                        <Box display="flex" flexDirection="column" gap={1}
                            sx={{
                                p: 3,

                                height: '100%', // Ensures both blocks are the same height
                            }}
                        >

                            <Typography variant='h5' >Personal Info</Typography>
                            <Typography variant="body1" sx={{ marginTop: 2 }}>
                                <strong>Company:</strong> {data?.company}
                            </Typography>
                            <Typography variant="body1" sx={{ marginTop: 2 }}>
                                <strong>Address:</strong> {`${data?.street}, ${data?.zipCode}, ${data?.location}, ${data?.country}`}
                            </Typography>
                            <Typography variant="body1" sx={{ marginTop: 2 }}>
                                <strong>Phone Number:</strong> {data?.phone}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} mt={2}
                        sx={{
                            p: 3,
                            border: '1px solid #ddd',
                            borderRadius: 2,
                            height: '100%', // Ensures both blocks are the same height
                        }}>
                        <Typography variant='h5'>Support Message</Typography>
                        <Typography variant="body1" sx={{ marginTop: 2 }}>
                            {data?.supportMessage || "There is no support meesage! Direct contact the customer."}
                        </Typography>
                    </Grid>
                </Grid>




            </Box>
        </Fade>
    </Modal>
);

export default ViewModal;
