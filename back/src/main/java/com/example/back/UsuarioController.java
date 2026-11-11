package com.example.back;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Scene;
import javafx.scene.control.Alert;
import javafx.scene.control.CheckBox;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.stage.Stage;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ConnectException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UsuarioController {

    // Precisa ser IGUAL ao spring.secret do application.properties do backend
    private static final String SECRET_KEY = "sifi3232fayugfy3232auweba75675d";

    private static final String URL_API = "http://localhost:8080/usuarios/admin";

    // Marcado = dono do sistema (sem empresa, vê todas as empresas)
    @FXML
    private CheckBox chkGlobal;

    // ===== Dados da Empresa =====
    @FXML
    private TextField txtRazaoSocial;

    @FXML
    private TextField txtNomeFantasia;

    @FXML
    private TextField txtCnpj;

    // ===== Dados do Administrador =====
    @FXML
    private TextField txtNome;

    @FXML
    private TextField txtCPF;

    @FXML
    private TextField txtEmail;

    @FXML
    private PasswordField txtSenha;

    // Bloqueia os campos da empresa quando for usuário global
    @FXML
    public void alternarGlobal() {
        boolean global = chkGlobal.isSelected();

        txtRazaoSocial.setDisable(global);
        txtNomeFantasia.setDisable(global);
        txtCnpj.setDisable(global);

        if (global) {
            txtRazaoSocial.clear();
            txtNomeFantasia.clear();
            txtCnpj.clear();
        }
    }

    @FXML
    public void salvarUsuario(ActionEvent event) {

        boolean global = chkGlobal.isSelected();

        //Validar Dados (empresa só é obrigatória quando NÃO for global)
        if (!global && (campoVazio(txtRazaoSocial) || campoVazio(txtNomeFantasia) || campoVazio(txtCnpj))) {
            showMessage(Alert.AlertType.WARNING, "Preencha os dados da empresa!");
            return;
        }
        if (campoVazio(txtNome) || campoVazio(txtCPF) || campoVazio(txtEmail) || campoVazio(txtSenha)) {
            showMessage(Alert.AlertType.WARNING, "Preencha os dados do administrador!");
            return;
        }

        String jsonRequest = String.format("{\n" +
                        "  \"nome\": \"%s\",\n" +
                        "  \"email\": \"%s\",\n" +
                        "  \"senha\": \"%s\",\n" +
                        "  \"cpf\": \"%s\",\n" +
                        "  \"secretKey\": \"%s\",\n" +
                        "  \"razaoSocial\": \"%s\",\n" +
                        "  \"nomeFantasia\": \"%s\",\n" +
                        "  \"cnpj\": \"%s\",\n" +
                        "  \"global\": %s\n" +
                        "}",
                json(txtNome.getText()),
                json(txtEmail.getText()),
                json(txtSenha.getText()),
                json(txtCPF.getText()),
                SECRET_KEY,
                json(txtRazaoSocial.getText()),
                json(txtNomeFantasia.getText()),
                json(txtCnpj.getText()),
                String.valueOf(global));

        try {
            RespostaApi resposta = executaMetodoAPI(URL_API, jsonRequest, "POST");

            if (resposta.status == 200) {
                // O backend responde 200 com id 0 quando a chave secreta está errada
                long idAdmin = extrairId(resposta.corpo);

                if (idAdmin > 0) {
                    String mensagem = global
                            ? "Usuário GLOBAL (dono do sistema) cadastrado com sucesso!"
                            : "Empresa e administrador cadastrados com sucesso!";
                    showMessage(Alert.AlertType.INFORMATION,
                            mensagem + "\nJá é possível fazer login no sistema web.");
                    voltar(event);
                } else {
                    showMessage(Alert.AlertType.ERROR,
                            "Chave secreta inválida! Confira se a SECRET_KEY do JavaFX é igual ao spring.secret do backend.");
                }

            } else if (resposta.corpo != null && !resposta.corpo.trim().isEmpty()) {
                showMessage(Alert.AlertType.ERROR, "Erro ao salvar: " + resposta.corpo);
            } else {
                showMessage(Alert.AlertType.ERROR, "Dados inválidos! Verifique o CPF e o e-mail informados.");
            }

        } catch (ConnectException e) {
            showMessage(Alert.AlertType.ERROR,
                    "Não foi possível conectar ao backend.\nVerifique se a API está rodando em http://localhost:8080.");
        } catch (Exception e) {
            showMessage(Alert.AlertType.ERROR, "Erro inesperado: " + e.getMessage());
        }
    }

    @FXML
    public void voltar(ActionEvent event) throws IOException {
        FXMLLoader loader =
                new FXMLLoader(getClass().getResource("/com/example/back/menu-view.fxml"));

        Scene scene = new Scene(loader.load());
        Stage stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        stage.setScene(scene);
    }

    // Guarda o código HTTP e o corpo da resposta da API
    private static class RespostaApi {
        int status;
        String corpo;
    }

    private RespostaApi executaMetodoAPI(String url, String json, String protocoloHttp) throws Exception {

        URL urlAPI = new URL(url);
        HttpURLConnection connection = (HttpURLConnection) urlAPI.openConnection();
        connection.setRequestMethod(protocoloHttp);
        connection.setDoOutput(true);

        if (!json.isEmpty()) {
            connection.setRequestProperty("Content-Type", "application/json; charset=UTF-8");

            try (OutputStream os = connection.getOutputStream()) {
                os.write(json.getBytes(StandardCharsets.UTF_8)); // UTF-8 para não quebrar acentos
            }
        }

        RespostaApi resposta = new RespostaApi();
        resposta.status = connection.getResponseCode();

        // Lê o corpo da resposta (sucesso ou erro)
        InputStream corpo = resposta.status < 400 ? connection.getInputStream() : connection.getErrorStream();
        resposta.corpo = corpo != null ? new String(corpo.readAllBytes(), StandardCharsets.UTF_8) : "";

        return resposta;
    }

    // Procura o "id": 123 dentro do JSON de resposta
    private long extrairId(String corpo) {
        if (corpo == null) {
            return 0L;
        }
        Matcher matcher = Pattern.compile("\"id\"\\s*:\\s*(\\d+)").matcher(corpo);
        return matcher.find() ? Long.parseLong(matcher.group(1)) : 0L;
    }

    // Evita quebrar o JSON se o usuário digitar aspas ou barra
    private String json(String valor) {
        return valor.trim().replace("\\", "\\\\").replace("\"", "\\\"");
    }

    private boolean campoVazio(TextField campo) {
        return campo.getText() == null || campo.getText().trim().isEmpty();
    }

    private void showMessage(Alert.AlertType type, String msg) {
        Alert alerta = new Alert(type);
        alerta.setTitle("Mensagem do Sistema!");
        alerta.setHeaderText(null);
        alerta.setContentText(msg);
        alerta.showAndWait();
    }
}