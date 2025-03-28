import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import './App.css';
// Import the logo - assuming you'll save it as logo.png in the public folder

function App() {
  // State for the first calculator (find selling price)
  const [cost1, setCost1] = useState('');
  const [markupPercentage, setMarkupPercentage] = useState('');
  const [sellingPrice1, setSellingPrice1] = useState('');
  const [profit1, setProfit1] = useState('');
  const [margin1, setMargin1] = useState('');

  // State for the second calculator (find markup percentage)
  const [cost2, setCost2] = useState('');
  const [sellingPrice2, setSellingPrice2] = useState('');
  const [markupResult, setMarkupResult] = useState('');
  const [profit2, setProfit2] = useState('');
  const [margin2, setMargin2] = useState('');

  // State for the third calculator (find cost)
  const [sellingPrice3, setSellingPrice3] = useState('');
  const [markupPercentage3, setMarkupPercentage3] = useState('');
  const [costResult, setCostResult] = useState('');
  const [profit3, setProfit3] = useState('');
  const [margin3, setMargin3] = useState('');

  // Active tab state
  const [activeTab, setActiveTab] = useState('selling-price');

  // Calculate selling price based on cost and markup
  const calculateSellingPrice = () => {
    if (cost1 && markupPercentage) {
      const costValue = parseFloat(cost1);
      const markupValue = parseFloat(markupPercentage) / 100;
      const calculatedPrice = costValue * (1 + markupValue);
      const calculatedProfit = calculatedPrice - costValue;
      const calculatedMargin = (calculatedProfit / calculatedPrice) * 100;

      setSellingPrice1(calculatedPrice.toFixed(2));
      setProfit1(calculatedProfit.toFixed(2));
      setMargin1(calculatedMargin.toFixed(2));
    } else {
      setSellingPrice1('');
      setProfit1('');
      setMargin1('');
    }
  };

  // Calculate markup percentage based on cost and selling price
  const calculateMarkupPercentage = () => {
    if (cost2 && sellingPrice2) {
      const costValue = parseFloat(cost2);
      const priceValue = parseFloat(sellingPrice2);

      if (costValue > 0) {
        const calculatedMarkup = ((priceValue - costValue) / costValue) * 100;
        const calculatedProfit = priceValue - costValue;
        const calculatedMargin = (calculatedProfit / priceValue) * 100;

        setMarkupResult(calculatedMarkup.toFixed(2));
        setProfit2(calculatedProfit.toFixed(2));
        setMargin2(calculatedMargin.toFixed(2));
      }
    } else {
      setMarkupResult('');
      setProfit2('');
      setMargin2('');
    }
  };

  // Calculate cost based on selling price and markup percentage
  const calculateCost = () => {
    if (sellingPrice3 && markupPercentage3) {
      const priceValue = parseFloat(sellingPrice3);
      const markupValue = parseFloat(markupPercentage3) / 100;

      if (markupValue !== -1) {
        const calculatedCost = priceValue / (1 + markupValue);
        const calculatedProfit = priceValue - calculatedCost;
        const calculatedMargin = (calculatedProfit / priceValue) * 100;

        setCostResult(calculatedCost.toFixed(2));
        setProfit3(calculatedProfit.toFixed(2));
        setMargin3(calculatedMargin.toFixed(2));
      }
    } else {
      setCostResult('');
      setProfit3('');
      setMargin3('');
    }
  };

  // Effect hooks to trigger calculations when inputs change
  useEffect(() => {
    calculateSellingPrice();
  }, [cost1, markupPercentage]);

  useEffect(() => {
    calculateMarkupPercentage();
  }, [cost2, sellingPrice2]);

  useEffect(() => {
    calculateCost();
  }, [sellingPrice3, markupPercentage3]);

  return (
    <div className="calculator-container">
      <div className="calculator-header">
        <div className="header-content">
          <img 
            ={`${process.env.PUBLIC_URL}/logo.png`} 
            alt="UNFROSEN Logo" 
            className="company-logo" /> 
          />
          <div className="calculator-title">
            <Calculator className="calculator-icon" />
            <h1>Retail Markup Calculator</h1>
          </div>
        </div>
        <p className="calculator-description">
          Calculate selling price, markup percentage, or cost based on retail pricing formulas
        </p>
      </div>

      <div className="calculator-content">
        <div className="tabs">
          <button 
            className={activeTab === 'selling-price' ? 'tab-active' : 'tab'} 
            onClick={() => setActiveTab('selling-price')}
          >
            Find Selling Price
          </button>
          <button 
            className={activeTab === 'markup' ? 'tab-active' : 'tab'} 
            onClick={() => setActiveTab('markup')}
          >
            Find Markup %
          </button>
          <button 
            className={activeTab === 'cost' ? 'tab-active' : 'tab'} 
            onClick={() => setActiveTab('cost')}
          >
            Find Cost
          </button>
        </div>

        {activeTab === 'selling-price' && (
          <div className="tab-content">
            <h3 className="tab-title">Calculate Selling Price</h3>
            <div className="input-group">
              <label htmlFor="cost1">Cost ($)</label>
              <input
                id="cost1"
                type="number"
                min="0.01"
                step="0.01"
                value={cost1}
                onChange={(e) => setCost1(e.target.value)}
                placeholder="Enter product cost"
              />
            </div>
            <div className="input-group">
              <label htmlFor="markup">Markup Percentage (%)</label>
              <input
                id="markup"
                type="number"
                min="0"
                step="0.1"
                value={markupPercentage}
                onChange={(e) => setMarkupPercentage(e.target.value)}
                placeholder="Enter desired markup percentage"
              />
            </div>

            {sellingPrice1 && (
              <div className="result-box">
                <div className="result-item">
                  <span className="result-label">Selling Price:</span>
                  <span className="result-value">${sellingPrice1}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Profit:</span>
                  <span className="result-value">${profit1}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Margin:</span>
                  <span className="result-value">{margin1}%</span>
                </div>
                <p className="formula">Formula: Selling Price = Cost × (1 + Markup Percentage as decimal)</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'markup' && (
          <div className="tab-content">
            <h3 className="tab-title">Calculate Markup Percentage</h3>
            <div className="input-group">
              <label htmlFor="cost2">Cost ($)</label>
              <input
                id="cost2"
                type="number"
                min="0.01"
                step="0.01"
                value={cost2}
                onChange={(e) => setCost2(e.target.value)}
                placeholder="Enter product cost"
              />
            </div>
            <div className="input-group">
              <label htmlFor="selling-price2">Selling Price ($)</label>
              <input
                id="selling-price2"
                type="number"
                min="0.01"
                step="0.01"
                value={sellingPrice2}
                onChange={(e) => setSellingPrice2(e.target.value)}
                placeholder="Enter selling price"
              />
            </div>

            {markupResult && (
              <div className="result-box">
                <div className="result-item">
                  <span className="result-label">Markup Percentage:</span>
                  <span className="result-value">{markupResult}%</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Profit:</span>
                  <span className="result-value">${profit2}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Margin:</span>
                  <span className="result-value">{margin2}%</span>
                </div>
                <p className="formula">Formula: Markup = [(Selling Price - Cost) ÷ Cost] × 100</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'cost' && (
          <div className="tab-content">
            <h3 className="tab-title">Calculate Cost</h3>
            <div className="input-group">
              <label htmlFor="selling-price3">Selling Price ($)</label>
              <input
                id="selling-price3"
                type="number"
                min="0.01"
                step="0.01"
                value={sellingPrice3}
                onChange={(e) => setSellingPrice3(e.target.value)}
                placeholder="Enter selling price"
              />
            </div>
            <div className="input-group">
              <label htmlFor="markup3">Markup Percentage (%)</label>
              <input
                id="markup3"
                type="number"
                min="0"
                step="0.1"
                value={markupPercentage3}
                onChange={(e) => setMarkupPercentage3(e.target.value)}
                placeholder="Enter markup percentage"
              />
            </div>

            {costResult && (
              <div className="result-box">
                <div className="result-item">
                  <span className="result-label">Cost:</span>
                  <span className="result-value">${costResult}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Profit:</span>
                  <span className="result-value">${profit3}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Margin:</span>
                  <span className="result-value">{margin3}%</span>
                </div>
                <p className="formula">Formula: Cost = Selling Price ÷ (1 + Markup Percentage as decimal)</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="calculator-footer">
        <p>Based on standard retail pricing formulas. Remember that markup is calculated as a percentage of cost, while margin is calculated as a percentage of selling price.</p>
      </div>
    </div>
  );
}

export default App;