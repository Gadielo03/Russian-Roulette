import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Box } from '@mui/material';

function ResultModal({ open, winner, onRemove, onSkip, onClose, onEndSession, isLastElement }) {
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle sx={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 'bold' }}>
                {isLastElement ? '🏆 ¡Ganador Final! 🏆' : '🎉 Resultado de la Ruleta 🎉'}
            </DialogTitle>
            <DialogContent sx={{ textAlign: 'center', padding: '30px' }}>
                <Typography variant="h4" sx={{ 
                    marginBottom: 3, 
                    color: isLastElement ? '#f57c00' : '#1976d2', 
                    fontWeight: 'bold',
                    border: `2px solid ${isLastElement ? '#f57c00' : '#1976d2'}`,
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: isLastElement ? '#fff3e0' : '#f5f5f5'
                }}>
                    {winner}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    {isLastElement 
                        ? '¡Felicitaciones! Este es el último elemento. La sesión se reiniciará automáticamente.'
                        : '¿Qué deseas hacer con esta opción?'
                    }
                </Typography>
            </DialogContent>
            <DialogActions sx={{ flexDirection: 'column', gap: 2, padding: '20px' }}>
                {!isLastElement && (
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button 
                            onClick={onRemove}
                            variant="contained" 
                            color="error"
                            size="large"
                            sx={{ minWidth: '150px' }}
                        >
                            Eliminar
                        </Button>
                        <Button 
                            onClick={onSkip}
                            variant="contained" 
                            color="primary"
                            size="large"
                            sx={{ minWidth: '150px' }}
                        >
                            Saltear
                        </Button>
                    </Box>
                )}
                
                {!isLastElement && (
                    <Button 
                        onClick={onEndSession}
                        variant="outlined" 
                        color="secondary"
                        size="medium"
                        sx={{ 
                            minWidth: '200px',
                            borderWidth: 2,
                            '&:hover': {
                                borderWidth: 2
                            }
                        }}
                    >
                        🔄 Reiniciar Sesión
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default ResultModal;