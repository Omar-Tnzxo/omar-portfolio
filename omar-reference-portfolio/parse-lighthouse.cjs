const report = require('./lighthouse-report.json');

console.log('\n🎯 LIGHTHOUSE REPORT - Omar Hassan Portfolio');
console.log('='.repeat(60));
console.log(`URL: ${report.finalUrl}`);
console.log(`Date: ${report.fetchTime}`);
console.log('='.repeat(60));
console.log('\n📊 SCORES:\n');

Object.entries(report.categories).forEach(([key, cat]) => {
  const score = Math.round(cat.score * 100);
  const emoji = score >= 90 ? '🟢' : score >= 50 ? '🟡' : '🔴';
  console.log(`${emoji} ${cat.title.padEnd(25)} ${score}/100`);
});

console.log('\n⏱️  PERFORMANCE METRICS:\n');

const metrics = {
  'first-contentful-paint': 'First Contentful Paint',
  'largest-contentful-paint': 'Largest Contentful Paint',
  'total-blocking-time': 'Total Blocking Time',
  'cumulative-layout-shift': 'Cumulative Layout Shift',
  'speed-index': 'Speed Index',
  'interactive': 'Time to Interactive'
};

Object.entries(metrics).forEach(([key, name]) => {
  const audit = report.audits[key];
  if (audit && audit.displayValue) {
    console.log(`  ${name.padEnd(30)} ${audit.displayValue}`);
  }
});

console.log('\n🚨 OPPORTUNITIES (Performance Improvements):\n');

const opportunities = Object.values(report.audits).filter(audit =>
  audit.details && audit.details.type === 'opportunity' && audit.score !== null && audit.score < 1
);

opportunities.slice(0, 5).forEach((audit, i) => {
  console.log(`  ${i+1}. ${audit.title}`);
  if (audit.displayValue) {
    console.log(`     Potential savings: ${audit.displayValue}`);
  }
});

console.log('\n⚠️  DIAGNOSTICS:\n');

const diagnostics = Object.values(report.audits).filter(audit =>
  audit.details && audit.details.type === 'table' && audit.score !== null && audit.score < 1
);

diagnostics.slice(0, 5).forEach((audit, i) => {
  console.log(`  ${i+1}. ${audit.title}`);
});

console.log('\n='.repeat(60));
