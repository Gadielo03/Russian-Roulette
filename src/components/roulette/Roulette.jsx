import React, { useContext, useState } from 'react'
import { Wheel } from 'react-custom-roulette';
import DataContext from '../../DataContext';
import { Button } from '@mui/material';
import ResultModal from '../modal/ResultModal';

function Roulette() {
    const { wheelOptions, wheelConfig, setWheelOptions, startSession, endSession } = useContext(DataContext)
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [showResultModal, setShowResultModal] = useState(false);
    const [winner, setWinner] = useState('');

    const handleSpinClick = () => {
        if (!mustSpin && wheelOptions && wheelOptions.length > 0) {
            const newPrizeNumber = Math.floor(Math.random() * wheelOptions.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
            startSession(); 
        }
    }

    const handleStopSpinning = () => {
        setMustSpin(false);
        const winnerOption = wheelData[prizeNumber];
        setWinner(winnerOption.option);
        setShowResultModal(true);
    }

    const handleRemoveOption = () => {
        const newOptions = wheelOptions.filter((_, index) => index !== prizeNumber);
        setWheelOptions(newOptions);
        
        if (newOptions.length <= 1) {
            setTimeout(() => {
                setShowResultModal(false);
                endSession();
            }, 1500); 
        } else {
            setShowResultModal(false);
        }
    }

    const handleSkip = () => {
        setShowResultModal(false);
    }

    const handleEndSession = () => {
        setShowResultModal(false);
        endSession();
    }

    const wheelData = wheelOptions && wheelOptions.length > 0 
        ? wheelOptions.map(item => ({
            ...item,
            option: item.option.length > 13 
                ? item.option.substring(0, 10) + '...' 
                : item.option
          }))
        : [{ option: 'No Options' }];

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '20px',
            padding: '20px'
        }}>
            <div style={{
                transform: `scale(${wheelConfig.wheelScale})`,
                transformOrigin: 'center',
                margin: `${50 + (wheelConfig.wheelScale - 1) * 50}px`
            }}>
                <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={wheelData}
                backgroundColors={wheelConfig.backgroundColors}
                textColors={wheelConfig.textColors}
                outerBorderColor={wheelConfig.outerBorderColor}
                outerBorderWidth={wheelConfig.outerBorderWidth}
                innerBorderColor={wheelConfig.innerBorderColor}
                innerBorderWidth={wheelConfig.innerBorderWidth}
                radiusLineColor={wheelConfig.radiusLineColor}
                radiusLineWidth={wheelConfig.radiusLineWidth}
                spinDuration={wheelConfig.spinDuration}
                onStopSpinning={handleStopSpinning}
                perpendicularText={false}
                />
            </div>
            <Button 
                variant="contained" 
                size="large"
                sx={{ 
                    marginTop: "1.5rem",
                    fontSize: '1.5rem', 
                    padding: '15px 40px',
                    minWidth: '200px'
                }}
                onClick={handleSpinClick}
                disabled={!wheelOptions || wheelOptions.length === 0}
            >
                SPIN
            </Button>

            <ResultModal
                open={showResultModal}
                winner={winner}
                onRemove={handleRemoveOption}
                onSkip={handleSkip}
                onClose={wheelOptions.length <= 1 ? handleEndSession : handleSkip}
                onEndSession={handleEndSession}
                isLastElement={wheelOptions.length <= 1}
            />
        </div>
    )
}

export default Roulette