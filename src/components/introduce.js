const template = /*html*/`
  <div>
    <v-card class="mb-2" color="transparent" flat>
      <div>
        <v-row justify="center">
        <v-col md="9">
          <h2 class="content-color">Rút gọn URL đơn giản và nhanh chóng!</h2>
          Rut.vn cho phép rút gọn các liên kết dài từ Instagram, Facebook, YouTube, Twitter, LinkedIn và các
          trang hàng đầu trên Internet, chỉ cần dán URL mà bạn cảm thấy dài và nhấn vào nút Rút gọn. Trên màn
          hình tiếp theo, sao chép URL đã rút gọn, quét mã QR và chia sẻ nó trên các trang web, trò chuyện và
          e-mail. Sau khi rút gọn URL, hãy kiểm tra xem URL đó đã nhận được bao nhiêu lượt click.
        </v-col>
        </v-row>
      </div>
      <br><br>
      <div>
        <v-row justify="center">
          <v-col class="text-center" md="3">
            <v-icon size="75" class="content-color">mdi-thumb-up-outline</v-icon>
            <h3 class="my-3 content-color">Dễ dàng</h3>
            <p class="text-left">Rut.vn rất dễ dàng và nhanh chóng, hãy nhập liên kết dài để lấy liên kết rút gọn
            của bạn.</p>
          </v-col>
          <v-col class="text-center" md="3">
            <v-icon size="75" class="content-color">mdi-link-variant</v-icon>
            <h3 class="my-3 content-color">Rút gọn</h3>
            <p class="text-left">Sử dụng bất kỳ liên kết nào, bất kể kích thước, run.vn luôn rút ngắn</p>
          </v-col>
          <v-col class="text-center" md="3">
            <v-icon size="75" class="content-color">mdi-shield-account</v-icon>
            <h3 class="my-3 content-color">Bảo mật</h3>
            <p class="text-left">Nhanh chóng và an toàn, dịch vụ của chúng tôi có giao thức HTTPS và mã hóa dữ
            liệu</p>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
`

export default {
  template: template,
}