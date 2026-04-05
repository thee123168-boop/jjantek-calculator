import React, { useState } from 'react';
import './App.css';

// 숫자 포맷 (천단위 콤마)
const fmt = (n) => Math.round(n).toLocaleString('ko-KR');

// ────────────────────────────────
// 1. 가계부 분석기
// ────────────────────────────────
function BudgetAnalyzer() {
  const [income, setIncome] = useState('');
  const [food, setFood] = useState('');
  const [transport, setTransport] = useState('');
  const [housing, setHousing] = useState('');
  const [entertainment, setEntertainment] = useState('');
  const [other, setOther] = useState('');

  const calc = () => {
    const i = parseFloat(income.replace(/,/g, '')) * 10000;
    if (!i) return null;
    const f = parseFloat(food || 0) * 10000;
    const t = parseFloat(transport || 0) * 10000;
    const h = parseFloat(housing || 0) * 10000;
    const e = parseFloat(entertainment || 0) * 10000;
    const o = parseFloat(other || 0) * 10000;
    const total = f + t + h + e + o;
    const saving = i - total;
    const savingRate = (saving / i) * 100;
    return { i, f, t, h, e, o, total, saving, savingRate };
  };

  const result = calc();

  const getRating = (rate) => {
    if (rate >= 30) return { label: '🏆 절약 고수!', color: '#22543d' };
    if (rate >= 20) return { label: '👍 양호해요', color: '#276749' };
    if (rate >= 10) return { label: '⚠️ 조금 더 노력해봐요', color: '#744210' };
    return { label: '🚨 지출 점검이 필요해요', color: '#742a2a' };
  };

  return (
    <div className="calculator-card">
      <h2>📊 가계부 분석기</h2>
      <p className="desc">월 수입과 지출 항목을 입력하면 저축률과 소비 패턴을 분석해드려요.</p>
      <div className="input-group">
        <label>월 수입 (만원)</label>
        <input type="text" placeholder="예: 300" value={income}
          onChange={e => setIncome(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className="input-group">
        <label>식비 (만원)</label>
        <input type="text" placeholder="예: 40" value={food}
          onChange={e => setFood(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className="input-group">
        <label>교통비 (만원)</label>
        <input type="text" placeholder="예: 15" value={transport}
          onChange={e => setTransport(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className="input-group">
        <label>주거비 (월세/관리비, 만원)</label>
        <input type="text" placeholder="예: 50" value={housing}
          onChange={e => setHousing(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className="input-group">
        <label>여가/문화/외식 (만원)</label>
        <input type="text" placeholder="예: 20" value={entertainment}
          onChange={e => setEntertainment(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className="input-group">
        <label>기타 지출 (만원)</label>
        <input type="text" placeholder="예: 10" value={other}
          onChange={e => setOther(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      {result && (
        <>
          <div className="result-box">
            <div className="result-label">월 저축 가능액</div>
            <div className="result-value" style={{color: result.saving >= 0 ? '#2563eb' : '#e53e3e'}}>
              {result.saving >= 0 ? fmt(result.saving) : `-${fmt(Math.abs(result.saving))}`}원
            </div>
            <div className="result-sub">저축률: {result.savingRate.toFixed(1)}%</div>
          </div>
          {result.i > 0 && (
            <div className="result-box" style={{background: '#f0fff4', borderColor: '#9ae6b4', marginTop: 8}}>
              <div className="result-value" style={{fontSize: '1rem', color: getRating(result.savingRate).color}}>
                {getRating(result.savingRate).label}
              </div>
              <div className="result-sub" style={{marginTop: 4}}>전문가 권장 저축률: 수입의 20~30%</div>
            </div>
          )}
          <div className="result-detail">
            <div className="detail-row"><span>월 수입</span><span>{fmt(result.i)}원</span></div>
            <div className="detail-row"><span>식비</span><span>-{fmt(result.f)}원</span></div>
            <div className="detail-row"><span>교통비</span><span>-{fmt(result.t)}원</span></div>
            <div className="detail-row"><span>주거비</span><span>-{fmt(result.h)}원</span></div>
            <div className="detail-row"><span>여가/문화</span><span>-{fmt(result.e)}원</span></div>
            <div className="detail-row"><span>기타</span><span>-{fmt(result.o)}원</span></div>
            <div className="detail-row"><span>총 지출</span><span>-{fmt(result.total)}원</span></div>
          </div>
        </>
      )}
    </div>
  );
}

// ────────────────────────────────
// 2. 커피값 절약 계산기
// ────────────────────────────────
function CoffeeCalculator() {
  const [price, setPrice] = useState('');
  const [perDay, setPerDay] = useState('1');
  const [alternative, setAlternative] = useState('');

  const calc = () => {
    const p = parseFloat(price.replace(/,/g, ''));
    const d = parseFloat(perDay);
    const a = parseFloat(alternative.replace(/,/g, '')) || 0;
    if (!p || !d) return null;
    const dailySave = (p - a) * d;
    const monthlySave = dailySave * 30;
    const yearlySave = dailySave * 365;
    const fiveYearSave = yearlySave * 5;
    return { dailySave, monthlySave, yearlySave, fiveYearSave };
  };

  const result = calc();

  return (
    <div className="calculator-card">
      <h2>☕ 커피값 절약 계산기</h2>
      <p className="desc">매일 마시는 커피값이 모이면 얼마나 될까요? 절약하면 얼마를 모을 수 있는지 계산해드려요.</p>
      <div className="input-group">
        <label>현재 커피 한 잔 가격 (원)</label>
        <input type="text" placeholder="예: 6000" value={price}
          onChange={e => setPrice(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className="input-group">
        <label>하루 몇 잔</label>
        <select value={perDay} onChange={e => setPerDay(e.target.value)}>
          <option value="1">1잔</option>
          <option value="2">2잔</option>
          <option value="3">3잔</option>
          <option value="4">4잔 이상</option>
        </select>
      </div>
      <div className="input-group">
        <label>대체 음료 가격 (원, 선택 - 없으면 0)</label>
        <input type="text" placeholder="예: 1500 (편의점 커피)" value={alternative}
          onChange={e => setAlternative(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      {result && (
        <>
          <div className="result-box">
            <div className="result-label">연간 절약 가능액</div>
            <div className="result-value">{fmt(result.yearlySave)}원</div>
            <div className="result-sub">5년 후: {fmt(result.fiveYearSave)}원</div>
          </div>
          <div className="result-detail">
            <div className="detail-row"><span>하루 절약</span><span>{fmt(result.dailySave)}원</span></div>
            <div className="detail-row"><span>한 달 절약</span><span>{fmt(result.monthlySave)}원</span></div>
            <div className="detail-row"><span>1년 절약</span><span>{fmt(result.yearlySave)}원</span></div>
            <div className="detail-row"><span>5년 절약</span><span>{fmt(result.fiveYearSave)}원</span></div>
          </div>
        </>
      )}
    </div>
  );
}

// ────────────────────────────────
// 3. 구독 서비스 정리 계산기
// ────────────────────────────────
function SubscriptionCalculator() {
  const [subscriptions, setSubscriptions] = useState([
    { name: '넷플릭스', price: '', active: true },
    { name: '유튜브 프리미엄', price: '', active: true },
    { name: '스포티파이', price: '', active: true },
    { name: '기타', price: '', active: true },
  ]);

  const addRow = () => {
    setSubscriptions([...subscriptions, { name: '', price: '', active: true }]);
  };

  const update = (idx, field, val) => {
    const next = [...subscriptions];
    next[idx][field] = val;
    setSubscriptions(next);
  };

  const totalMonthly = subscriptions
    .filter(s => s.active)
    .reduce((sum, s) => sum + (parseFloat(s.price) || 0), 0);

  return (
    <div className="calculator-card">
      <h2>📱 구독 서비스 정리 계산기</h2>
      <p className="desc">매달 나가는 구독 서비스를 정리해보세요. 불필요한 지출을 발견할 수 있어요.</p>
      <div style={{marginBottom: 12}}>
        {subscriptions.map((s, idx) => (
          <div key={idx} style={{display:'flex', gap:'8px', marginBottom:'8px', alignItems:'center'}}>
            <input
              type="text"
              placeholder="서비스명"
              value={s.name}
              onChange={e => update(idx, 'name', e.target.value)}
              style={{flex:2, padding:'8px', borderRadius:'6px', border:'1px solid #e2e8f0', fontSize:'14px'}}
            />
            <input
              type="text"
              placeholder="월 금액(원)"
              value={s.price}
              onChange={e => update(idx, 'price', e.target.value.replace(/[^0-9]/g, ''))}
              style={{flex:2, padding:'8px', borderRadius:'6px', border:'1px solid #e2e8f0', fontSize:'14px'}}
            />
            <label style={{display:'flex', alignItems:'center', gap:'4px', fontSize:'13px', whiteSpace:'nowrap'}}>
              <input type="checkbox" checked={s.active}
                onChange={e => update(idx, 'active', e.target.checked)} />
              사용중
            </label>
          </div>
        ))}
      </div>
      <button onClick={addRow}
        style={{background:'#e2e8f0', border:'none', padding:'8px 16px', borderRadius:'6px', cursor:'pointer', marginBottom:'16px', fontSize:'14px'}}>
        + 항목 추가
      </button>
      {totalMonthly > 0 && (
        <>
          <div className="result-box">
            <div className="result-label">월 구독 총액</div>
            <div className="result-value">{fmt(totalMonthly)}원</div>
            <div className="result-sub">연간: {fmt(totalMonthly * 12)}원</div>
          </div>
          <div className="result-detail">
            {subscriptions.filter(s => s.active && s.price).map((s, idx) => (
              <div key={idx} className="detail-row">
                <span>{s.name || '미입력'}</span>
                <span>{fmt(parseFloat(s.price))}원/월</span>
              </div>
            ))}
          </div>
          <div className="result-detail" style={{marginTop:8, background:'#fff5f5', border:'1px solid #feb2b2'}}>
            <p style={{fontSize:'0.82rem', color:'#742a2a'}}>
              💡 월 {fmt(totalMonthly)}원 = 연 {fmt(totalMonthly * 12)}원이 구독료로 나가고 있어요. 안 쓰는 서비스는 해지를 고려해보세요!
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// ────────────────────────────────
// 4. 할인율 / 가성비 계산기
// ────────────────────────────────
function DiscountCalculator() {
  const [original, setOriginal] = useState('');
  const [discounted, setDiscounted] = useState('');
  const [mode, setMode] = useState('rate'); // rate or price

  const calc = () => {
    const o = parseFloat(original.replace(/,/g, ''));
    const d = parseFloat(discounted.replace(/,/g, ''));
    if (!o) return null;
    if (mode === 'rate') {
      if (!d) return null;
      const rate = ((o - d) / o) * 100;
      const saved = o - d;
      return { rate, saved, final: d };
    } else {
      if (!d) return null;
      const final = o * (1 - d / 100);
      const saved = o - final;
      return { rate: d, saved, final };
    }
  };

  const result = calc();

  return (
    <div className="calculator-card">
      <h2>🏷️ 할인율 계산기</h2>
      <p className="desc">정가와 할인가를 입력하면 할인율과 절약 금액을 알려드려요.</p>
      <div className="input-group">
        <label>계산 방식</label>
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="rate">정가 + 할인가 → 할인율 계산</option>
          <option value="price">정가 + 할인율 → 할인가 계산</option>
        </select>
      </div>
      <div className="input-group">
        <label>정가 (원)</label>
        <input type="text" placeholder="예: 50000" value={original}
          onChange={e => setOriginal(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className="input-group">
        <label>{mode === 'rate' ? '할인가 (원)' : '할인율 (%)'}</label>
        <input type="text"
          placeholder={mode === 'rate' ? '예: 35000' : '예: 30'}
          value={discounted}
          onChange={e => setDiscounted(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      {result && (
        <>
          <div className="result-box">
            <div className="result-label">할인율</div>
            <div className="result-value">{result.rate.toFixed(1)}%</div>
            <div className="result-sub">최종 가격: {fmt(result.final)}원</div>
          </div>
          <div className="result-detail">
            <div className="detail-row"><span>정가</span><span>{fmt(parseFloat(original.replace(/,/g,'')))}원</span></div>
            <div className="detail-row"><span>할인율</span><span>{result.rate.toFixed(1)}%</span></div>
            <div className="detail-row"><span>절약 금액</span><span>{fmt(result.saved)}원</span></div>
            <div className="detail-row"><span>최종 가격</span><span>{fmt(result.final)}원</span></div>
          </div>
        </>
      )}
    </div>
  );
}

// ────────────────────────────────
// 5. 무지출 챌린지 목표 계산기
// ────────────────────────────────
function NospendCalculator() {
  const [target, setTarget] = useState('');
  const [days, setDays] = useState('30');
  const [already, setAlready] = useState('');

  const calc = () => {
    const t = parseFloat(target.replace(/,/g, '')) * 10000;
    const d = parseInt(days);
    const a = parseFloat(already.replace(/,/g, '')) * 10000 || 0;
    if (!t || !d) return null;
    const remaining = Math.max(t - a, 0);
    const dailyBudget = remaining / (d - (a > 0 ? Math.floor(a / (t / d)) : 0));
    const progress = Math.min((a / t) * 100, 100);
    return { t, remaining, dailyBudget, progress, d };
  };

  const result = calc();

  return (
    <div className="calculator-card">
      <h2>🎯 무지출 챌린지 목표 계산기</h2>
      <p className="desc">절약 목표 금액과 기간을 입력하면 하루 허용 지출액을 계산해드려요.</p>
      <div className="input-group">
        <label>절약 목표 금액 (만원)</label>
        <input type="text" placeholder="예: 50" value={target}
          onChange={e => setTarget(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className="input-group">
        <label>챌린지 기간</label>
        <select value={days} onChange={e => setDays(e.target.value)}>
          <option value="7">7일 (1주)</option>
          <option value="14">14일 (2주)</option>
          <option value="30">30일 (1개월)</option>
          <option value="90">90일 (3개월)</option>
        </select>
      </div>
      <div className="input-group">
        <label>현재까지 절약한 금액 (만원, 선택)</label>
        <input type="text" placeholder="예: 10" value={already}
          onChange={e => setAlready(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      {result && (
        <>
          <div className="result-box">
            <div className="result-label">하루 허용 지출</div>
            <div className="result-value">{fmt(result.dailyBudget)}원</div>
            <div className="result-sub">남은 목표: {fmt(result.remaining)}원</div>
          </div>
          <div style={{marginTop:16, background:'#e2e8f0', borderRadius:8, height:12, overflow:'hidden'}}>
            <div style={{
              width:`${result.progress}%`, height:'100%',
              background:'linear-gradient(90deg,#22543d,#48bb78)',
              borderRadius:8, transition:'width 0.5s'
            }}/>
          </div>
          <div className="result-detail" style={{marginTop:8}}>
            <div className="detail-row"><span>목표 금액</span><span>{fmt(result.t)}원</span></div>
            <div className="detail-row"><span>현재 절약</span><span>{fmt(parseFloat(already||0)*10000)}원</span></div>
            <div className="detail-row"><span>달성률</span><span>{result.progress.toFixed(1)}%</span></div>
            <div className="detail-row"><span>기간</span><span>{result.d}일</span></div>
          </div>
        </>
      )}
    </div>
  );
}

// ────────────────────────────────
// 6. 연간 지출 분석기
// ────────────────────────────────
function AnnualAnalyzer() {
  const [monthly, setMonthly] = useState('');
  const [label, setLabel] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    const m = parseFloat(monthly.replace(/,/g, '')) * 10000;
    if (!m || !label) return;
    setItems([...items, { label, monthly: m }]);
    setMonthly('');
    setLabel('');
  };

  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));

  const total = items.reduce((s, i) => s + i.monthly, 0);

  return (
    <div className="calculator-card">
      <h2>📅 연간 지출 분석기</h2>
      <p className="desc">매달 나가는 고정 지출 항목을 추가하면 연간 총 지출을 분석해드려요.</p>
      <div style={{display:'flex', gap:'8px', marginBottom:'12px'}}>
        <input
          type="text"
          placeholder="항목명 (예: 통신비)"
          value={label}
          onChange={e => setLabel(e.target.value)}
          style={{flex:2, padding:'8px', borderRadius:'6px', border:'1px solid #e2e8f0', fontSize:'14px'}}
        />
        <input
          type="text"
          placeholder="월 금액(만원)"
          value={monthly}
          onChange={e => setMonthly(e.target.value.replace(/[^0-9]/g, ''))}
          style={{flex:1, padding:'8px', borderRadius:'6px', border:'1px solid #e2e8f0', fontSize:'14px'}}
        />
        <button onClick={addItem}
          style={{background:'#2563eb', color:'white', border:'none', padding:'8px 16px', borderRadius:'6px', cursor:'pointer', fontSize:'14px'}}>
          추가
        </button>
      </div>
      {items.length > 0 && (
        <>
          <div className="result-detail">
            {items.map((item, idx) => (
              <div key={idx} className="detail-row">
                <span>{item.label}</span>
                <span style={{display:'flex', gap:'12px', alignItems:'center'}}>
                  <span>{fmt(item.monthly)}원/월</span>
                  <button onClick={() => removeItem(idx)}
                    style={{background:'none', border:'none', color:'#e53e3e', cursor:'pointer', fontSize:'13px'}}>✕</button>
                </span>
              </div>
            ))}
          </div>
          <div className="result-box" style={{marginTop:12}}>
            <div className="result-label">연간 총 고정지출</div>
            <div className="result-value">{fmt(total * 12)}원</div>
            <div className="result-sub">월 합계: {fmt(total)}원</div>
          </div>
          <div className="result-detail" style={{marginTop:8, background:'#fffbeb', border:'1px solid #f6e05e'}}>
            <p style={{fontSize:'0.82rem', color:'#744210'}}>
              💡 연간 {fmt(total * 12)}원이 고정 지출로 나가요. 항목 하나씩 점검해보세요!
            </p>
          </div>
        </>
      )}
    </div>
  );
}

// ────────────────────────────────
// 7. 식비 절약 목표 계산기
// ────────────────────────────────
function FoodSavingCalculator() {
  const [current, setCurrent] = useState('');
  const [target, setTarget] = useState('');
  const [perMeal, setPerMeal] = useState('3');

  const calc = () => {
    const c = parseFloat(current.replace(/,/g, '')) * 10000;
    const t = parseFloat(target.replace(/,/g, '')) * 10000;
    const meals = parseInt(perMeal) * 30;
    if (!c || !t) return null;
    const save = c - t;
    const savePerMeal = save / meals;
    const yearSave = save * 12;
    return { save, savePerMeal, yearSave, currentPerMeal: c / meals, targetPerMeal: t / meals };
  };

  const result = calc();

  return (
    <div className="calculator-card">
      <h2>🍱 식비 절약 목표 계산기</h2>
      <p className="desc">현재 식비와 목표 식비를 입력하면 한 끼당 줄여야 할 금액을 알려드려요.</p>
      <div className="input-group">
        <label>현재 월 식비 (만원)</label>
        <input type="text" placeholder="예: 50" value={current}
          onChange={e => setCurrent(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className="input-group">
        <label>목표 월 식비 (만원)</label>
        <input type="text" placeholder="예: 35" value={target}
          onChange={e => setTarget(e.target.value.replace(/[^0-9]/g, ''))} />
      </div>
      <div className="input-group">
        <label>하루 평균 식사 횟수</label>
        <select value={perMeal} onChange={e => setPerMeal(e.target.value)}>
          <option value="1">1끼</option>
          <option value="2">2끼</option>
          <option value="3">3끼</option>
        </select>
      </div>
      {result && (
        <>
          <div className="result-box">
            <div className="result-label">한 끼당 줄여야 할 금액</div>
            <div className="result-value">{fmt(result.savePerMeal)}원</div>
            <div className="result-sub">연간 절약: {fmt(result.yearSave)}원</div>
          </div>
          <div className="result-detail">
            <div className="detail-row"><span>현재 한 끼 평균</span><span>{fmt(result.currentPerMeal)}원</span></div>
            <div className="detail-row"><span>목표 한 끼 평균</span><span>{fmt(result.targetPerMeal)}원</span></div>
            <div className="detail-row"><span>월 절약 목표</span><span>{fmt(result.save)}원</span></div>
            <div className="detail-row"><span>연간 절약 효과</span><span>{fmt(result.yearSave)}원</span></div>
          </div>
        </>
      )}
    </div>
  );
}

// ────────────────────────────────
// 탭 목록
// ────────────────────────────────
const TABS = [
  { id: 'budget', label: '📊 가계부 분석' },
  { id: 'coffee', label: '☕ 커피값 절약' },
  { id: 'subscription', label: '📱 구독 정리' },
  { id: 'discount', label: '🏷️ 할인율' },
  { id: 'nospend', label: '🎯 무지출 챌린지' },
  { id: 'annual', label: '📅 연간 지출' },
  { id: 'food', label: '🍱 식비 절약' },
];

// ────────────────────────────────
// 메인 App
// ────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState('budget');

  return (
    <div className="app">
      <header>
        <h1>🪙 짠테크 계산기</h1>
        <p>똑똑하게 아끼는 절약 계산기 모음</p>
      </header>

      <div className="tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'budget' && <BudgetAnalyzer />}
      {activeTab === 'coffee' && <CoffeeCalculator />}
      {activeTab === 'subscription' && <SubscriptionCalculator />}
      {activeTab === 'discount' && <DiscountCalculator />}
      {activeTab === 'nospend' && <NospendCalculator />}
      {activeTab === 'annual' && <AnnualAnalyzer />}
      {activeTab === 'food' && <FoodSavingCalculator />}

      <div className="ad-placeholder">
        📢 광고 영역 (Google AdSense 연동 시 여기에 광고가 표시됩니다)
      </div>

      {/* ── 자매 사이트 링크 배너 ── */}
      <div style={{
        textAlign: 'center',
        padding: '24px 16px',
        margin: '16px 0',
        background: '#ebf4ff',
        borderRadius: '12px',
        border: '1px solid #bee3f8',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <p style={{ fontSize: '14px', color: '#2c5282', fontWeight: '600', margin: 0 }}>
          🔗 함께 사용하면 더 좋은 사이트
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://reteck-calculator.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#2563eb',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            💰 재테크 계산기
          </a>
          <a
            href="https://fininfo.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: '#059669',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            📰 핀인포 금융정보
          </a>
        </div>
      </div>

      <footer>
        <p>© 2025 짠테크 계산기 · 본 계산 결과는 참고용이며 실제와 다를 수 있습니다.</p>
      </footer>
    </div>
  );
}
