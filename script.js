// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');
  
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
  
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
  
      // Close menu when clicking a link
      navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
        });
      });
    }
  
    // Navbar Scroll Effect
    const header = document.querySelector('header');
    let lastScroll = 0;
  
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      header.classList.toggle('scrolled', currentScroll > 50);
      
      // Hide/Show navbar on scroll
      if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
      lastScroll = currentScroll;
    });
  
    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const headerOffset = 100;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Intersection Observer for Fade-in Animations
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Add floating animation to skill cards when they become visible
          if (entry.target.classList.contains('skill-card')) {
            entry.target.style.animation = 'float 3s ease-in-out infinite';
          }
        }
      });
    }, observerOptions);
  
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in, .skill-card, .project-card').forEach(element => {
      observer.observe(element);
    });
  
    // Project Filtering with Smooth Transitions
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
  
        const filter = button.dataset.filter;
        
        projectCards.forEach(card => {
          // Get the card's categories (can be multiple)
          const categories = card.dataset.category.split(' ');
          
          if (filter === 'all' || categories.includes(filter)) {
            // Show card with animation
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.display = 'block';
              requestAnimationFrame(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              });
            }, 300);
          } else {
            // Hide card with animation
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  
    // Skill Cards Hover Effect
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
  
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
  
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
  
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
      });
  
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  
    // Parallax Effect for Hero Section
    const hero = document.querySelector('.hero');
    const profilePic = document.querySelector('.profile-pic');
  
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.35;
      
      if (profilePic) {
        profilePic.style.transform = `translate3d(0, ${rate}px, 0) rotate(${rate * 0.05}deg)`;
      }
    });
  
    // Typing Animation for Hero Title
    const heroTitle = document.querySelector('.hero h1 span');
    if (heroTitle) {
      const text = heroTitle.textContent;
      heroTitle.textContent = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          heroTitle.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      
      setTimeout(typeWriter, 1000);
    }
  
    // Custom Cursor Effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
  
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  
    // Add cursor effects for interactive elements
    document.querySelectorAll('a, button, .skill-card, .project-card').forEach(element => {
      element.addEventListener('mouseenter', () => cursor.classList.add('cursor-expanded'));
      element.addEventListener('mouseleave', () => cursor.classList.remove('cursor-expanded'));
    });
  
    // Enhanced Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.style.transform = 'translateX(0)';
          entry.target.style.opacity = '1';
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '-50px'
    });
  
    timelineItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = item.classList.contains('right') ? 'translateX(50px)' : 'translateX(-50px)';
      item.style.transition = 'all 0.5s ease';
      timelineObserver.observe(item);
    });
  });