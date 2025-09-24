import React, { useContext, useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TextField, Typography, Box, Slider, Button } from '@mui/material';
import DataContext from '../../DataContext';

function Configuration() {
    const { wheelOptions, setWheelOptions, wheelConfig, setWheelConfig, saveConfigurations } = useContext(DataContext);
    const [wheelOptionsText, setWheelOptionsText] = useState(wheelOptions.map(opt => opt.option).join('\n'));
    const [backgroundColorsText, setBackgroundColorsText] = useState(wheelConfig.backgroundColors.join(', '));
    const [textColorsText, setTextColorsText] = useState(wheelConfig.textColors.join(', '));
    const [outerBorderColorText, setOuterBorderColorText] = useState(wheelConfig.outerBorderColor);

    useEffect(() => {
        const currentOptions = wheelOptionsText.split('\n').filter(opt => opt.trim() !== '');
        const newOptions = wheelOptions.map(opt => opt.option);
        
        if (JSON.stringify(currentOptions) !== JSON.stringify(newOptions)) {
            setWheelOptionsText(wheelOptions.map(opt => opt.option).join('\n'));
        }
    }, [wheelOptions]);

    useEffect(() => {
        const backgroundColors = wheelConfig.backgroundColors.join(', ');
        const textColors = wheelConfig.textColors.join(', ');
        
        const stripTrailingComma = (str) => str.replace(/,\s*$/, '');
        
        if (stripTrailingComma(backgroundColorsText) !== stripTrailingComma(backgroundColors)) {
            setBackgroundColorsText(backgroundColors);
        }
        
        if (stripTrailingComma(textColorsText) !== stripTrailingComma(textColors)) {
            setTextColorsText(textColors);
        }
        
        setOuterBorderColorText(wheelConfig.outerBorderColor);
    }, [wheelConfig]);

    const handleOptionsChange = (options) => {
        const filteredOptions = options.split('\n')
            .filter(option => option.trim() !== '')
            .map((option) => ({ option: option.trim() }));
        setWheelOptions(filteredOptions);
    };

    const handleConfigChange = (key, value) => {
        setWheelConfig(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleColorsChange = (colorsString, type) => {
        const colors = colorsString.split(',').map(color => color.trim()).filter(color => color);
        
        handleConfigChange(type, colors);
    };

    return (
        <Card sx={{ width: '400px', maxHeight: '90vh',padding:'10px',margin:'10px'}}>
            <CardContent>
                <Typography variant="h5" fontWeight={700} sx={{ marginBottom: 3 }}>
                    CONFIGURATION
                </Typography>
                
                {/* Wheel Options */}
                <Box sx={{ marginBottom: 3 }}>
                    <TextField
                        fullWidth
                        placeholder="Enter options (one per line)"
                        label="Wheel Options"
                        variant='outlined'
                        multiline
                        rows={4}
                        value={wheelOptionsText}
                        onChange={(e) => { 
                            setWheelOptionsText(e.target.value);
                            handleOptionsChange(e.target.value); 
                        }}
                    />
                </Box>

                {/* Background Colors */}
                <Box sx={{ marginBottom: 3 }}>
                    <TextField
                        fullWidth
                        label="Background Colors (comma separated)"
                        placeholder="#ff8f43, #70bbe0, #f9dd50"
                        value={backgroundColorsText}
                        onChange={(e) => {
                            setBackgroundColorsText(e.target.value);
                            handleColorsChange(e.target.value, 'backgroundColors');
                        }}
                    />
                </Box>

                {/* Text Colors */}
                <Box sx={{ marginBottom: 3 }}>
                    <TextField
                        fullWidth
                        label="Text Colors (comma separated)"
                        placeholder="#ffffff, #000000"
                        value={textColorsText}
                        onChange={(e) => {
                            setTextColorsText(e.target.value);
                            handleColorsChange(e.target.value, 'textColors');
                        }}
                    />
                </Box>



                {/* Outer Border */}
                <Box sx={{ marginBottom: 3 }}>
                    <TextField
                        fullWidth
                        label="Outer Border Color"
                        placeholder="#ccc"
                        value={outerBorderColorText}
                        onChange={(e) => {
                            setOuterBorderColorText(e.target.value);
                            handleConfigChange('outerBorderColor', e.target.value);
                        }}
                        sx={{ marginBottom: 2 }}
                    />
                    <Typography gutterBottom>Outer Border Width: {wheelConfig.outerBorderWidth}px</Typography>
                    <Slider
                        value={wheelConfig.outerBorderWidth}
                        min={0}
                        max={30}
                        onChange={(e, value) => handleConfigChange('outerBorderWidth', value)}
                    />
                </Box>

                {/* Spin Duration */}
                <Box sx={{ marginBottom: 3 }}>
                    <Typography gutterBottom>Spin Duration: {wheelConfig.spinDuration}s</Typography>
                    <Slider
                        value={wheelConfig.spinDuration}
                        min={0.1}
                        max={3}
                        step={0.1}
                        onChange={(e, value) => handleConfigChange('spinDuration', value)}
                    />
                </Box>

                {/* Wheel Size */}
                <Box sx={{ marginBottom: 3 }}>
                    <Typography gutterBottom>Wheel Size: {wheelConfig.wheelScale}x</Typography>
                    <Slider
                        value={wheelConfig.wheelScale}
                        min={0.5}
                        max={1.5}
                        step={0.1}
                        onChange={(e, value) => handleConfigChange('wheelScale', value)}
                        marks={[
                            { value: 0.5, label: '0.5x' },
                            { value: 1, label: '1x' },
                            { value: 1.5, label: '1.5x' }
                        ]}
                    />
                </Box>

                {/* Botón de Guardar Configuraciones */}
                <Box sx={{ marginTop: 4, textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        color="success"
                        size="large"
                        onClick={saveConfigurations}
                        sx={{
                            minWidth: '200px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold'
                        }}
                    >
                        💾 Guardar Configuraciones
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default Configuration