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
    private EmpresaRepository empresaRepository; // NOVO
    @Autowired
    private TokenService tokenService;
    @Value("${spring.secret}")
    private String secret;

    public LoginResponse validarUsuarioAutenticadoRetornaToken(LoginRequest resquest) {
        if (usuarioRepository.existsUsuarioByEmailAndSenha(resquest.email(), resquest.senha())) {
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

    @Transactional(rollbackFor = Exception.class) //Salva Empresa + Admin juntos (se um falhar, nenhum é salvo)
    //Ao adicionar (rollbackFor = Exception.class), você está dizendo explicitamente ao Spring: "Não importa se o erro é leve,
    //pesado, verificado ou não verificado. Se der qualquer tipo de erro (Exception), desfaça tudo o que foi feito no banco."
    public CriarAdminResponse criarAdmin(CriarAdminRequest criarAdminRequest) {
        if (!criarAdminRequest.secretKey().equals(secret)) {
            return new CriarAdminResponse(0L, "Usuario Salvo com sucesso!");
        }
        // NOVO: cria a empresa do administrador
        Empresa empresa = new Empresa(criarAdminRequest);
        empresaRepository.save(empresa);

        Usuario usuarioAdminSalvar = new Usuario(criarAdminRequest);
        usuarioAdminSalvar.setEmpresa(empresa); // NOVO: liga o admin à empresa
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
            // NOVO: o usuário criado pertence à mesma empresa de quem o criou
            usuarioBanco.setEmpresa(empresaRepository.findById(usuarioLogado.empresa_id()).orElse(null));
            usuarioRepository.save(usuarioBanco);

            return new UsuarioResponse(usuarioBanco);
        } else {
            //Usuario existente
            Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
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
        var usuario = usuarioRepository.findById(id).orElse(null);
        if (usuario == null) {
            return null;
        }
        return new UsuarioResponse(usuario);
    }

    public boolean atualizarStatus(EnumStatusUsuario status, Long id) {
        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
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
}