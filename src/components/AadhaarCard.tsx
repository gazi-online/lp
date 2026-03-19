import React from 'react';

interface AadhaarCardProps {
  name?: string;
  photo?: string | null;
  isFlipped?: boolean;
  scale?: number;
}

const AadhaarCard: React.FC<AadhaarCardProps> = ({
  name = "Rajesh Kumar",
  photo = null,
  isFlipped = false,
  scale = 1,
}) => {
  const styles: Record<string, React.CSSProperties> = {
    card: {
      width: '600px',
      height: '380px',
      background: '#f5f5f5',
      borderRadius: '12px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      position: 'relative',
      overflow: 'hidden',
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      flexShrink: 0,
    },
    // Front Side Styles
    frontHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '15px 25px',
    },
    emblem: { width: '50px', height: '60px' },
    titleSection: { textAlign: 'center', flex: 1 },
    hindiTitle: {
      fontSize: '22px',
      fontWeight: 600,
      color: '#1a1a1a',
      marginBottom: '2px',
    },
    govtText: {
      fontSize: '16px',
      fontWeight: 600,
      color: '#1a1a1a',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    titleUnderline: {
      width: '280px',
      height: '2px',
      background: '#1a1a1a',
      margin: '5px auto 0',
    },
    aadhaarLogo: {
      width: '80px',
      height: '70px',
      position: 'relative',
    },
    redLine: {
      height: '3px',
      background: 'linear-gradient(90deg, transparent 0%, #c41e3a 20%, #c41e3a 80%, transparent 100%)',
      margin: '0 20px',
    },
    frontContent: {
      display: 'flex',
      padding: '20px 25px',
      gap: '25px',
    },
    photoSection: {
      width: '140px',
      height: '170px',
      background: '#ddd',
      border: '3px solid #fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    },
    photoPlaceholder: {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #87CEEB 0%, #4682B4 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '60px',
      color: 'white',
    },
    detailsSection: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '12px',
    },
    detailRow: { display: 'flex', alignItems: 'baseline', gap: '10px' },
    detailLabel: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#333',
      minWidth: '80px',
    },
    detailValue: { fontSize: '20px', color: '#1a1a1a', fontWeight: 500 },
    aadhaarNumber: {
      fontSize: '42px',
      fontWeight: 'bold',
      color: '#333',
      letterSpacing: '4px',
      marginTop: '15px',
      fontFamily: "'Courier New', monospace",
    },
    qrSection: {
      width: '140px',
      height: '140px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    qrCode: {
      width: '130px',
      height: '130px',
      background: '#fff',
      padding: '5px',
    },
    qrPattern: {
      width: '100%',
      height: '100%',
      backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 3px, transparent 3px, transparent 6px), repeating-linear-gradient(90deg, #000 0px, #000 3px, transparent 3px, transparent 6px)',
      backgroundSize: '6px 6px',
      position: 'relative',
    },
    hindiSlogan: {
      textAlign: 'center',
      fontSize: '18px',
      color: '#1a1a1a',
      fontWeight: 600,
      padding: '10px',
    },
    tricolorLine: {
      height: '8px',
      bottom: 0,
      width: '100%',
      background: 'linear-gradient(90deg, #ff9933 0%, #ff9933 33%, #ffffff 33%, #ffffff 66%, #138808 66%, #138808 100%)',
    },
    // Back Side Styles
    cardBack: {
      background: '#f8f8f8',
      padding: '25px',
      display: 'flex',
      flexDirection: 'column',
    },
    backHeader: { textAlign: 'center', marginBottom: '20px' },
    backTitle: { fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '5px' },
    backWebsite: { fontSize: '16px', color: '#333', fontWeight: 600 },
    backContent: { display: 'flex', justifyContent: 'space-between', flex: 1 },
    backLeft: { flex: 1 },
    helpline: { fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '20px' },
    addressSection: { marginBottom: '20px' },
    addressLabel: { fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '10px' },
    addressText: { fontSize: '16px', color: '#333', lineHeight: 1.4, maxWidth: '300px' },
    importantSection: { borderTop: '2px solid #333', paddingTop: '15px' },
    importantTitle: { fontSize: '16px', fontWeight: 'bold', color: '#c41e3a', marginBottom: '8px' },
    importantList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    importantItem: {
      fontSize: '12px',
      color: '#333',
      marginBottom: '5px',
      paddingLeft: '10px',
      position: 'relative',
      lineHeight: 1.3,
    },
    backRight: {
      width: '180px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backFooter: {
      textAlign: 'center',
      marginTop: 'auto',
      paddingTop: '10px',
      borderTop: '3px solid #c41e3a',
    },
    issuedBy: { fontSize: '14px', fontWeight: 600, color: '#1a1a1a' },
  };

  if (isFlipped) {
    return (
      <div style={{...styles.card, ...styles.cardBack}}>
        <div style={styles.backHeader}>
          <div style={styles.backTitle}>Unique Identification Authority of India</div>
          <div style={styles.backWebsite}>www.uidai.gov.in</div>
        </div>

        <div style={styles.backContent}>
          <div style={styles.backLeft}>
            <div style={styles.helpline}>Helpline No : 1947</div>
            
            <div style={styles.addressSection}>
              <div style={styles.addressLabel}>Address:</div>
              <div style={styles.addressText}>
                S/O: xxxxxxxxxx<br/>
                123, ABC Colony<br/>
                New Delhi - 110001
              </div>
            </div>

            <div style={styles.importantSection}>
              <div style={styles.importantTitle}>Important Information:</div>
              <ul style={styles.importantList}>
                {[
                  'Carry your Aadhaar card for access to Aadhaar services.',
                  'To authenticate, share your Aadhaar number and use biometric or OTP.',
                  'Keep your Aadhaar details secure and never share your OTP with anyone.'
                ].map((item, i) => (
                  <li key={i} style={styles.importantItem}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={styles.backRight}>
            <svg width="140" height="180" viewBox="0 0 200 250">
              <path fill="#ff9933" d="M40 20 L80 15 L120 20 L140 40 L150 80 L130 100 L100 110 L70 100 L50 80 L30 50 Z"/>
              <path fill="#ffffff" d="M50 80 L70 100 L100 110 L130 100 L140 120 L130 150 L100 160 L70 150 L50 120 Z"/>
              <path fill="#138808" d="M70 150 L100 160 L130 150 L140 180 L120 210 L100 220 L80 210 L60 180 Z"/>
              <circle cx="100" cy="130" r="15" fill="none" stroke="#000080" strokeWidth="2"/>
              <g stroke="#000080" strokeWidth="1">
                <line x1="100" y1="115" x2="100" y2="145"/>
                <line x1="85" y1="130" x2="115" y2="130"/>
                <line x1="89" y1="119" x2="111" y2="141"/>
                <line x1="111" y1="119" x2="89" y2="141"/>
              </g>
            </svg>
          </div>
        </div>

        <div style={styles.backFooter}>
          <div style={styles.issuedBy}>Issued by: Unique Identification Authority of India</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <div style={styles.frontHeader}>
        {/* Emblem */}
        <svg style={styles.emblem} viewBox="0 0 100 120">
          <path d="M50 10 L45 25 L55 25 Z" fill="#333"/>
          <ellipse cx="50" cy="25" rx="8" ry="5" fill="#333"/>
          <path d="M50 25 L30 40 L35 45 L50 35 L65 45 L70 40 Z" fill="#333"/>
          <path d="M50 35 L50 55" stroke="#333" strokeWidth="3"/>
          <rect x="25" y="55" width="50" height="8" fill="#333"/>
          <rect x="30" y="63" width="40" height="6" fill="#333"/>
          <rect x="35" y="69" width="30" height="5" fill="#333"/>
          <text x="50" y="95" textAnchor="middle" fontSize="8" fill="#333" fontWeight="bold">सत्यমেव जयते</text>
        </svg>

        <div style={styles.titleSection}>
          <div style={styles.hindiTitle}>আরक्षीव गरकार</div>
          <div style={styles.govtText}>Government of India</div>
          <div style={styles.titleUnderline}></div>
        </div>

        {/* Aadhaar Logo */}
        <div style={styles.aadhaarLogo}>
          <svg style={{position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60px', height: '30px'}} viewBox="0 0 100 50">
            {[0, 30, 60, 90, 120, -30, -60, -90, -120].map((deg, i) => (
              <path key={i} d="M50 0 L52 15 L50 12 L48 15 Z" fill="#ffa500" transform={`rotate(${deg} 50 25)`}/>
            ))}
          </svg>
          <svg style={{position: 'absolute', top: '25px', left: '50%', transform: 'translateX(-50%)', width: '70px', height: '35px'}} viewBox="0 0 100 50">
            <path d="M10 40 Q50 0 90 40" fill="none" stroke="#c41e3a" strokeWidth="4"/>
            <path d="M15 40 Q50 10 85 40" fill="none" stroke="#ffa500" strokeWidth="4"/>
            <path d="M20 40 Q50 20 80 40" fill="none" stroke="#c41e3a" strokeWidth="4"/>
          </svg>
          <div style={{position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', fontSize: '14px', fontWeight: 'bold', color: '#c41e3a', letterSpacing: '2px'}}>AADHAAR</div>
        </div>
      </div>

      <div style={styles.redLine}></div>

      <div style={styles.frontContent}>
        <div style={styles.photoSection}>
          {photo ? (
            <img src={photo} alt="Photo" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          ) : (
            <div style={styles.photoPlaceholder}>👤</div>
          )}
        </div>
        
        <div style={styles.detailsSection}>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Name:</span>
            <span style={styles.detailValue}>{name}</span>
          </div>
        </div>

        <div style={styles.qrSection}>
          <div style={styles.qrCode}>
            <div style={styles.qrPattern}></div>
          </div>
        </div>
      </div>

      <div style={{marginTop: 'auto'}}>
        <div style={styles.hindiSlogan}>यायावर - बाग बावर्ची रस अधिकारত</div>
        <div style={styles.tricolorLine}></div>
      </div>
    </div>
  );
};

export default AadhaarCard;
