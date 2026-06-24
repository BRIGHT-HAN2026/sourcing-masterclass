document.addEventListener('DOMContentLoaded', () => {

  // FAQ 아코디언
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // 부드러운 앵커 스크롤 (헤더 오프셋 없음)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // 포트원 결제 (가맹점 ID, 금액 확정 후 imp_XXXXXXXX와 amount: 0 교체)
  const payBtn = document.getElementById('payment-btn');
  if (payBtn) {
    payBtn.addEventListener('click', () => {
      const IMP = window.IMP;
      if (!IMP) {
        alert('결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
        return;
      }
      IMP.init('imp_XXXXXXXX'); // TODO: 포트원 가맹점 식별코드로 교체

      IMP.request_pay({
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: 'sbc_' + Date.now(),
        name: '소싱브랜딩 마스터클래스',
        amount: 0,           // TODO: 실제 수강료로 교체 (예: 1500000)
        buyer_email: '',
        buyer_name: '',
        buyer_tel: '',
      }, rsp => {
        if (rsp.success) {
          alert('결제가 완료되었습니다. 확인 후 개별 안내드리겠습니다.\n문의: ceo@mandeum.co.kr');
        } else {
          alert('결제 실패: ' + rsp.error_msg);
        }
      });
    });
  }

});
