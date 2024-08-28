import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const FormInc = () => {
  const [rubro, setRubro] = useState('');
  const [fechaFactura, setFechaFactura] = useState('');
  const [factura, setFactura] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [fechPago, setFechPago] = useState('');
  const [comprobantePago, setComprobantePago] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission logic here
    console.log({
      rubro,
      fechaFactura,
      factura,
      proveedor,
      descripcion,
      monto,
      fechPago,
      comprobantePago,
    });
    setRubro('');
    setFechaFactura('');
    setFactura('');
    setProveedor('');
    setDescripcion('');
    setMonto('');
    setFechPago('');
    setComprobantePago('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Rubro"
        variant="outlined"
        value={rubro}
        onChange={(e) => setRubro(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Fecha Factura"
        variant="outlined"
        value={fechaFactura}
        onChange={(e) => setFechaFactura(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Factura"
        variant="outlined"
        value={factura}
        onChange={(e) => setFactura(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Proveedor"
        variant="outlined"
        value={proveedor}
        onChange={(e) => setProveedor(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Descripción"
        variant="outlined"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Monto"
        variant="outlined"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Fecha Pago"
        variant="outlined"
        value={fechPago}
        onChange={(e) => setFechPago(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Comprobante Pago"
        variant="outlined"
        value={comprobantePago}
        onChange={(e) => setComprobantePago(e.target.value)}
        required
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Enviar
      </Button>
    </form>
  );
};

export default FormInc;
