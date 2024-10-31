import React from 'react';
import { Modal, Box, Typography, Stack, Avatar, Paper, ListItemText, Card, Link, Fade, IconButton } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';

const ViewModal = ({ open, handleClose, data }) => (
    <Modal
        keepMounted
        open={open}
        onClose={handleClose} // Close modal only when clicking outside
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
                        backgroundImage: 'url(/assets/images/mock/cover/cover-15.webp)', // Replace with your image path
                        backgroundSize: 'cover',
                        backgroundPosition: 'top',
                    }}
                >
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                            alt="User Avatar"
                            src={data?.photo}
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
                        />

                        <Box sx={{ ml: 20 }}>
                            <ListItemText
                                primary={
                                    <Typography variant="h6" color="white">
                                        {data?.fullName?.toUpperCase()}
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

                {/* Card with User Details */}

                <Box display="flex" flexDirection="column" gap={1}
                    sx={{
                        marginTop: 7, width: '50%', padding: 3,

                    }}
                >
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        <strong>Phone Number:</strong> {data?.phoneNumber}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 2 }}>
                        <strong>Country:</strong> {data?.country}
                    </Typography>

                    <Link href={data?.cv} target="_blank" rel="noopener" underline="hover" sx={{ marginTop: 2 }}>
                        View CV
                    </Link>
                    <Link href={data?.motivationLetter} target="_blank" rel="noopener" underline="hover" sx={{ marginTop: 2 }}>
                        View Motivation Letter
                    </Link>
                </Box>
            </Box>
        </Fade>
    </Modal>
);


export default ViewModal;
