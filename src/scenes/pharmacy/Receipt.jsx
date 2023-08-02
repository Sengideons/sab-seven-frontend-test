import React from 'react';

const Receipt = ({ invoiceData }) => {

  return (
    <div>
      <img
        style={{
          position: 'absolute',
          top: '0.00in',
          left: '1.28in',
          width: '3.33in',
          height: '1.97in'
        }}
        src="assets/receipt/ri_1.png"
      />
      <div
        style={{
          position: 'absolute',
          top: '3.89in',
          left: '0.42in',
          width: '0.32in',
          lineHeight: '0.17in'
        }}
      >
        <span 
        style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>
          QTY
        </span>

        <span 
        style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>
         </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '3.89in',
          left: '0.86in',
          width: '0.95in',
          lineHeight: '0.17in'
        }}
      >
        <span 
        style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>
          MEDICATION
        </span>
        <span 
        style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>
        </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '3.79in',
          left: '5.19in',
          width: '0.44in',
          lineHeight: '0.17in'
        }}
      >
        <span 
        style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>
          PR
        </span>
        <span 
        style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>ICE</span>
        <span 
        style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '3.99in',
          left: '5.19in',
          width: '0.44in',
          lineHeight: '0.17in'
        }}
      >
        <span style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>(GHC)</span>
        <span style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '4.22in',
          left: '0.42in',
          width: '0.12in',
          lineHeight: '0.17in'
        }}
      >
        <span 
        style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>{invoiceData.quantity}</span>
        <span 
        style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '4.22in',
          left: '0.86in',
          width: '1.62in',
          lineHeight: '0.17in'
        }}
      >
        <span 
        style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>
          OMEPRAZOLE
        </span>
        <span 
        style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>40 mg capsule</span>
        <span style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '4.22in',
          left: '2.68in',
          width: '1.42in',
          lineHeight: '0.17in'
        }}
      >
        <span 
        style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>30</span>
        <span 
        style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '4.22in',
          left: '4.19in',
          width: '0.59in',
          lineHeight: '0.17in'
        }}
      >
        <span 
        style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>{invoiceData.amount}</span>
        <span 
        style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '4.22in',
          left: '4.79in',
          width: '0.82in',
          lineHeight: '0.17in'
        }}
      >
        <span style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>135.00</span>
        <span style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '4.46in',
          left: '0.86in',
          width: '1.52in',
          lineHeight: '0.17in'
        }}
      >
        <span 
        style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>
          LORATADINE
        </span>
        <span style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>10 mg tablet</span>
        <span style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '4.46in',
          left: '2.68in',
          width: '1.42in',
          lineHeight: '0.17in'
        }}
      >
        <span style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>15</span>
        <span style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '4.46in',
          left: '4.19in',
          width: '0.59in',
          lineHeight: '0.17in'
        }}
      >
        <span style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>3.50</span>
        <span style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '4.46in',
          left: '4.79in',
          width: '0.82in',
          lineHeight: '0.17in'
        }}
      >
        <span style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>52.50</span>
        <span style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '4.70in',
          left: '0.42in',
          width: '0.12in',
          lineHeight: '0.17in'
        }}
      >
        <span style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>3</span>
        <span style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '4.70in',
          left: '0.86in',
          width: '1.32in',
          lineHeight: '0.17in'
        }}
      >
        <span style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>
          IBUPROFEN
        </span>
        <span style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>200 mg tablet</span>
        <span style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '4.70in',
          left: '2.68in',
          width: '1.42in',
          lineHeight: '0.17in'
        }}
      >
        <span style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>20</span>
        <span style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '4.70in',
          left: '4.19in',
          width: '0.59in',
          lineHeight: '0.17in'
        }}
      >
        <span style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>2.00</span>
        <span style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '4.70in',
          left: '4.79in',
          width: '0.82in',
          lineHeight: '0.17in'
        }}
      >
        <span style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>4.00</span>
        <span style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '5.13in',
          left: '4.47in',
          width: '0.70in',
          lineHeight: '0.17in'
        }}
      >
        <span style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>TOTAL</span>
        <span style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '5.36in',
          left: '4.47in',
          width: '0.70in',
          lineHeight: '0.17in'
        }}
      >
        <span style={{ fontStyle: 'normal', fontWeight: 'bold', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}>191.00</span>
        <span style={{ fontStyle: 'normal', fontWeight: 'normal', fontSize: '11pt', fontFamily: 'Calibri', color: '#000000' }}> </span>
        <br />
      </div>
    </div>
  );
};

export default Receipt;
