package com.example.transbus.application.services;

import com.example.transbus.application.DTOs.*;
import com.example.transbus.domain.entities.Empresa;
import com.example.transbus.domain.entities.Usuario;
import com.example.transbus.domain.repository.EmpresaRepository;
import com.example.transbus.domain.repository.UsuarioRepository;
import com.example.transbus.domain.valueobject.CPF;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private EmpresaRepository empresaRepository;
    @Autowired
    private TokenService tokenService;
    @Value("${spring.secret}")
    private String secret;


    public LoginResponse validarUsuarioAutenticadoRetornaToken(LoginRequest resquest) {
        // NOVO: só usuários ATIVOS podem fazer login (EXCLUIDO/BLOQUEADO não entram)
        if (usuarioRepository.existsUsuarioByEmailAndSenhaAndStatus(resquest.email(), resquest.senha(), EnumStatusUsuario.ATIVO)) {
            var token = tokenService.gerarToken(resquest);

            return new LoginResponse(token);
        }

        return null;
    }

    public List<UsuarioResponse> listarTodosUsuariosTable() {

        var usuariologado = getUsuarioLogado();

        if (usuariologado == null || usuariologado.empresa_id() == 0L) {
            return usuarioRepository.findAll()
                    .stream()
                    .map(UsuarioResponse::new)
                    .toList();
        }
        return usuarioRepository.getUsuariosByEmpresa_Id(usuariologado.empresa_id())
                .stream()
                .map(UsuarioResponse::new)
                .toList();
    }

    @Transactional
    public CriarAdminResponse criarAdmin(CriarAdminRequest criarAdminRequest) {
        if (!criarAdminRequest.secretKey().equals(secret)) {
            return new CriarAdminResponse(0L, "Usuario Salvo com sucesso!");
        }

        Empresa empresa = new Empresa(criarAdminRequest);
        empresaRepository.save(empresa);

        Usuario usuarioAdminSalvar = new Usuario(criarAdminRequest);
        usuarioAdminSalvar.setEmpresa(empresa);
        usuarioRepository.save(usuarioAdminSalvar);

        return new CriarAdminResponse(usuarioAdminSalvar.getId(), "Usuario Salvo com sucesso!");
    }

    public UsuarioLogado getUsuarioLogado() {
        var autenticacao = SecurityContextHolder.getContext().getAuthentication();

        // Com a segurança desligada (Teste 2) não existe usuário logado
        if (autenticacao == null || !(autenticacao.getPrincipal() instanceof UsuarioLogado)) {
            return null;
        }
        return (UsuarioLogado) autenticacao.getPrincipal();
    }

    public UsuarioResponse salvarUsuario(UsuarioRequest usuario, Long id) {

        var usuarioLogado = getUsuarioLogado();
        //Novo Usuario
        if (id == 0L) {
            Usuario usuarioBanco = new Usuario(usuario);
            if (usuarioLogado != null) {
                usuarioBanco.setEmpresa(empresaRepository.findById(usuarioLogado.empresa_id()).orElse(null));
            }
            usuarioRepository.save(usuarioBanco);

            return new UsuarioResponse(usuarioBanco);
        } else {
            //Usuario existente (NOVO: só altera se for da empresa do usuário logado)
            Usuario usuarioBanco = buscarUsuarioDaEmpresa(id);
            if (usuarioBanco != null) {
                usuarioBanco.setNome(usuario.nome());
                usuarioBanco.setCpf(new CPF(usuario.cpf()));
                usuarioBanco.setEmail(usuario.email());
                usuarioBanco.setSenha(usuario.senha());
                usuarioRepository.save(usuarioBanco);

                return new UsuarioResponse(usuarioBanco);
            }
        }
        return null;
    }

    public UsuarioResponse buscarPorId(Long id) {
        var usuario = buscarUsuarioDaEmpresa(id); // NOVO
        if (usuario == null) {
            return null;
        }

        return new UsuarioResponse(usuario);
    }

    public boolean atualizarStatus(EnumStatusUsuario status, Long id) {
        Usuario usuarioBanco = buscarUsuarioDaEmpresa(id); // NOVO
        if (usuarioBanco != null) {
            usuarioBanco.setStatus(status);
            usuarioRepository.save(usuarioBanco);

            return true;
        }
        return false;
    }

    public UsuarioResponse BuscarUsuarioLogado() {
        try {
            var usuarioLogado = getUsuarioLogado();
            return usuarioRepository.findById(usuarioLogado.id())
                    .stream()
                    .map(UsuarioResponse::new).findFirst().orElse(null);

        } catch (Exception e) {
            throw new RuntimeException("Erro ao buscar usuario logado!");

        }
    }

    // NOVO: busca o usuário pelo id, mas só devolve se for da empresa do usuário logado.
    // Se for de outra empresa, devolve null -> o controller responde 404 (Teste 3).
    private Usuario buscarUsuarioDaEmpresa(Long id) {
        var usuarioLogado = getUsuarioLogado();

        if (usuarioLogado == null || usuarioLogado.empresa_id() == 0L) {
            return usuarioRepository.findById(id).orElse(null);
        }
        return usuarioRepository.findByIdAndEmpresa_Id(id, usuarioLogado.empresa_id()).orElse(null);
    }
}