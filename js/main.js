document.addEventListener('DOMContentLoaded', () => {

  // 포트원 초기화 (1회만 실행)
  const IMP = window.IMP;
  if (IMP) {
    IMP.init('imp_XXXXXXXX'); // TODO: 포트원 가맹점 식별코드로 교체
  }

  // FAQ 아코디언
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // 포트원 결제
  const payBtn = document.getElementById('payment-btn');
  const buyerModal = document.getElementById('buyer-modal');
  const modalConfirm = document.getElementById('modal-confirm');
  const modalCancel = document.getElementById('modal-cancel');

  if (payBtn) {
    payBtn.addEventListener('click', () => {
      if (!IMP) {
        alert('결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
        return;
      }
      if (IMP._imp_key === 'imp_XXXXXXXX') {
        alert('결제 시스템 준비 중입니다. 계좌이체로 신청해 주세요.');
        return;
      }
      // 구매자 정보 모달 표시
      if (buyerModal) buyerModal.style.display = 'flex';
    });
  }

  if (modalCancel) {
    modalCancel.addEventListener('click', () => {
      if (buyerModal) buyerModal.style.display = 'none';
    });
  }

  if (modalConfirm) {
    modalConfirm.addEventListener('click', () => {
      const buyerName = document.getElementById('buyer-name').value.trim();
      const buyerTel = document.getElementById('buyer-tel').value.trim();
      const buyerEmail = document.getElementById('buyer-email').value.trim();

      if (!buyerName || !buyerTel) {
        alert('이름과 연락처는 필수 입력 항목입니다.');
        return;
      }

      if (buyerModal) buyerModal.style.display = 'none';

      IMP.request_pay({
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: 'sbc_' + Date.now(),
        name: '소싱브랜딩 마스터클래스',
        amount: 0,           // TODO: 실제 수강료로 교체 (예: 1500000)
        buyer_email: buyerEmail,
        buyer_name: buyerName,
        buyer_tel: buyerTel,
      }, rsp => {
        if (rsp.success) {
          alert('결제가 완료되었습니다. 확인 후 개별 안내드리겠습니다.\n문의: ceo@mandeum.co.kr');
        } else {
          alert('결제 실패: ' + rsp.error_msg);
        }
        if (buyerModal) buyerModal.style.display = 'none';
      });
    });
  }

});
