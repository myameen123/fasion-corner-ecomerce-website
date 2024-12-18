import { Modal } from '@mui/material';
import React from 'react';

function CardModel() {
  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 1000 }}>
      <Paper
        className='modal-content-container'
        style={{
          width,
          height,
          borderRadius,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {isLoading && (
          <div className='loader-container'>
            <CircularProgress size={60} />
          </div>
        )}
        {/* Header */}
        <div className='modal-header sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4'>
          {closable && (
            <IconButton onClick={onClose}>
              <X />
            </IconButton>
          )}
        </div>

        {/* Main Content */}
        <div
          className='modal-body flex-1 overflow-y-auto p-4'
          style={{ padding }}
        >
          <div>hell</div>
        </div>
      </Paper>
    </Modal>
  );
}

export default CardModel;
