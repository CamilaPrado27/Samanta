// Em src/components/Bichinho.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Bichinho = () => {
    const [emocao, setEmocao] = useState('feliz'); // Estado inicial da emoção

    const emocoes = {
        feliz: { scale: 1.3, rotate: 0, color: '#FFD700' },
        triste: { scale: 0.9, rotate: 20, color: '#6495ED' },
        animado: { scale: 1.6, rotate: -20, color: '#FF6347' }
    };

    return (
        <motion.div
            animate={emocoes[emocao]}
            transition={{ type: 'spring', stiffness: 200 }}
            style={{
                width: '150px',
                height: '150px',
                backgroundColor: emocoes[emocao].color, // Cor muda com a emoção
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                cursor: 'pointer'
            }}
            onClick={() => setEmocao(emocao === 'feliz' ? 'triste' : (emocao === 'triste' ? 'animado' : 'feliz'))}
        >
            {/* Olhos */}
            <div style={{
                position: 'absolute',
                top: '30%',
                left: '30%',
                width: '20px',
                height: '20px',
                backgroundColor: 'black',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)'
            }}></div>
            <div style={{
                position: 'absolute',
                top: '30%',
                right: '30%',
                width: '20px',
                height: '20px',
                backgroundColor: 'black',
                borderRadius: '50%',
                transform: 'translate(50%, -50%)'
            }}></div>
            
            {/* Boca */}
            <div style={{
                position: 'absolute',
                bottom: '25%',
                width: '60px',
                height: '20px',
                backgroundColor: 'black',
                borderRadius: '20px / 10px',
                transform: 'rotate(' + (emocao === 'triste' ? -20 : 0) + 'deg)'
            }}></div>
        </motion.div>
    );
};

export default Bichinho;

